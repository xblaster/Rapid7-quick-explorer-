# Liste des tâches d'implémentation

Cette liste propose un découpage initial pour développer le client Rapid7 InsightVM décrit dans la [Spécification](TECHNICAL_SPECIFICATION.md).

1. [x] **Initialisation du projet**
   - Générer le squelette avec `pnpm create vite` (template React JavaScript).
   - Ajouter les dépendances : MUI, React Query, Axios, Zustand, React Router.
2. [x] **Qualité de code et outils**
   - Configurer ESLint et Prettier.
   - Mettre en place Vitest et React Testing Library.
   - Ajouter Cypress pour les tests end‑to‑end.
3. [x] **Gestion de la configuration**
   - Créer les fichiers `.env.*` selon l'exemple fourni.
   - Implémenter un service de lecture des variables d'environnement.
4. [x] **Authentification**
   - Créer la page de connexion acceptant API Key ou Basic Auth + 2FA.
   - Stocker les informations chiffrées en `sessionStorage`.
5. [ ] **Couche d'accès API**
   - Implémenter un service Axios centralisant les en-têtes (API Key, JSON).
   - Gérer les erreurs globalement (intercepteurs).
6. [ ] **Structure de l'application**
   - Mettre en place React Router et le provider React Query.
   - Créer un store Zustand pour l'état UI.
   - Implémenter le thème MUI avec support dark/light.
7. [ ] **Pages principales**
   - Tableau de bord avec KPIs.
   - Liste des vulnérabilités (DataGrid + filtres).
   - Page de détail d'une vulnérabilité (assets, checks, actions).
   - Gestion des exceptions (CRUD + dialogues MUI).
8. [ ] **Notifications et journalisation**
   - Afficher les toasts de succès/erreur.
   - Prévoir une solution de log côté client (optionnel Log Rocket).
9. [ ] **Tests et CI**
   - Écrire des tests unitaires et d'intégration pour les composants clés.
   - Configurer GitHub Actions : lint, tests, build.
10. [ ] **Roadmap post‑MVP**
    - Implémenter OIDC, multitenant, exports CSV/PDF, websockets et PWA offline conformément à la section Roadmap de la spécification.

Cette liste pourra évoluer selon les retours et priorités du projet.
