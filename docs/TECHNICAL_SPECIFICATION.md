# Spécification fonctionnelle et technique – Rapid7 InsightVM React MUI Client

*Version 0.1 – 19 juin 2025*

## 1. Contexte

La plate‑forme **Rapid7 InsightVM** expose une API REST v3 qui permet de rechercher les vulnérabilités, de créer/mettre à jour des exceptions et de gérer l’ensemble du cycle de vie du risque. Le but du projet est de fournir une interface Web moderne (React 18 + MUI v5) facilitant ces opérations pour les équipes SecOps.

## 2. Objectifs / Périmètre

| ID   | Fonctionnalité                    | Description                                                                                                                                    |
| ---- | --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| F‑01 | **Authentification**              | Interface de connexion acceptant un *API Key* (header `X-Api-Key`) ou des identifiants Basic Auth + token 2FA. Persistance chiffrée en `sessionStorage`. |
| F‑02 | **Recherche de vulnérabilités**   | Liste paginée, filtre par gravité (CVSS v3), par mot‑clé, par asset, par date de publication.                                                   |
| F‑03 | **Détail vulnérabilité**          | Fiche complète : description, score CVSS, exploits, assets affectés, historique des scans, actions rapides (créer exception).                   |
| F‑04 | **Gestion des exceptions**        | CRUD (create, approve, recall, delete) sur les vulnérability exceptions. Affichage de l’état (Under Review, Approved, Rejected).                |
| F‑05 | **Tableau de bord**               | KPIs : nombre total de vulnérabilités, répartition par criticité, top 10 assets les plus exposés, heatmap temps‑forte.                          |
| F‑06 | **Notification & journalisation** | Toasts MUI pour succès/erreur, journalisation côté navigateur (Log Rocket optional) + export JSON.                                             |

## 3. Architecture

```
┌───────────────┐   API REST (Rapid7)
│ React (SPA)   │ ─────────────────────────┐
│   MUI v5      │                         │
│ ───────────── │   Axios Service Layer   │
│ React Query   │  – auth headers         │
│ React Router  │                         │
└───────────────┘                         │
          ▲                               │
          │ Environment (.env.*)          │
          └───────────────────────────────┘
```

* **Langage** : JavaScript (ESNext) + ESLint + Prettier
* **State** : *React Query* (server state) + *Zustand* (UI/ephemeral) + React Context pour le thème.
* **Tests** : Vitest + React Testing Library, Cypress pour E2E.
* **Build** : Vite + CI GitHub Actions (lint, test, build).

## 4. Endpoints Rapid7 cibles

| Cas d’usage           | Méthode | URL API v3                                           |
| --------------------- | ------- | ---------------------------------------------------- |
| Lister vulnérabilités | `GET`   | `/api/3/vulnerabilities?page={n}&size={m}&q={query}` |
| Détail vulnérabilité  | `GET`   | `/api/3/vulnerabilities/{id}`                        |
| Assets affectés       | `GET`   | `/api/3/vulnerabilities/{id}/assets`                 |
| Checks associés       | `GET`   | `/api/3/vulnerabilities/{id}/checks`                 |
| Lister exceptions     | `GET`   | `/api/3/vulnerability_exceptions`                    |
| Créer exception       | `POST`  | `/api/3/vulnerability_exceptions`                    |
| Mettre à jour statut  | `PATCH` | `/api/3/vulnerability_exceptions/{id}/{status}`      |
| Détails exception     | `GET`   | `/api/3/vulnerability_exceptions/{id}`               |

> **Headers communs**
>
> ```
> Accept: application/json
> Content-Type: application/json
> X-Api-Key: <R7_API_KEY>
> ```

## 5. Modèles JavaScript (extraits)

```js
// Exemple d'objet Vulnerability
const vulnerability = {
  id: "cve-2023-12345",
  title: "Titre",
  description: "Description",
  severity: "HIGH", // LOW | MEDIUM | HIGH | CRITICAL
  cvssScore: 9.3,
  published: "2024-01-01T00:00:00Z",
  modified: "2024-01-02T00:00:00Z",
};

// Exemple d'objet VulnerabilityException
const vulnerabilityException = {
  id: 1,
  state: "Under Review", // or Approved, Rejected, Deleted
  scope: {
    type: "asset", // asset | vulnerability | global
    assetId: 123,
    vulnerabilityId: "cve-2023-12345",
  },
  reason: "False Positive",
  submitter: "user@example.com",
  expires: "2024-12-31T23:59:59Z",
};
```

## 6. UX / UI MUI

* **Layout** : App Bar (titre, sélecteur de site), Drawer latéral (Dashboard, Vulnérabilités, Exceptions, Paramètres).
* **VulnerabilitiesPage** : DataGrid MUI (virtualisation), filtres via *Toolbar*.
* **ExceptionDialog** : formulaire pas à pas (Stepper) pour définir scope, raison, durée.
* **Dark / Light themes** : palette MUI, préférence système.

## 7. Sécurité & conformité

* Toutes les requêtes via HTTPS.
* Aucune donnée persistée hors session (sauf éventuellement stockage chiffré IndexedDB via **crypto.subtle**).
* Politique CSP stricte.
* CSRF non applicable (SPA + token).
* Scan SAST (GitHub Advanced Security) dans la CI.

## 8. Configuration (.env.example)

```bash
VITE_R7_BASE_URL=https://<console>.rapid7.com:3780
VITE_R7_API_KEY=YOUR_API_KEY
VITE_APP_USE_BASIC_AUTH=false
```

## 9. Scripts NPM

```json
{
  "dev": "vite",
  "lint": "eslint src --ext .jsx,.js",
  "test": "vitest",
  "build": "vite build",
  "e2e": "cypress open"
}
```

## 10. Lancement rapide

```bash
pnpm create vite rapid7-client -- --template react
cd rapid7-client
pnpm add @mui/material @emotion/react @emotion/styled @tanstack/react-query axios zustand react-router-dom@6
cp .env.example .env.local # renseigner VITE_R7_BASE_URL & VITE_R7_API_KEY
pnpm dev
```

## 11. Roadmap post‑MVP

1. Auth OIDC (Insight Platform) & rafraîchissement de token.
2. Gestion multitenant (plusieurs consoles Rapid7).
3. Export CSV / PDF.
4. WebSockets pour suivi en temps réel des scans.
5. PWA offline.

---

*Document prêt pour être consommé par Copilot/Codex afin de générer la structure du projet.*
