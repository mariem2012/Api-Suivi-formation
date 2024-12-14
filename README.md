# 🏫 Training MonitoringAPI

## 🖹 Description

Cette API fournit un ensemble d'endpoints pour gérer les différentes entités d'une plateforme de suivi de formations des apprenants (apprenants, paiements, modules, et inscriptions) de manière simple et efficace.

## 🚀 Prérequis

- Node.js (version 14 ou supérieure)
- Express Js
- PostgreSQL
- Prisma ORM
- Postman (pour tester l'API)

## 📥 Installation

1. **Clonez le dépôt** :

```bash
git clone https://github.com/Aichetou-Gaye/training_monitoring_api.git
```

2.  **Acceder au dossier du projet**

```bash
cd training_monitoring_api
```

3. **Installez les dépendances**

```bash
npm install
```

4. **Utilisation**

- Créer une base de données dans postgresql

- Remplacer d'abord vos informations de connexion à PostgreSql dans [.env.sample](.env.sample) ;

- Configuration de l'ORM

```bash
    npx prisma generate
```

```bash
    npx prisma migrate dev
```

- Pour démarrer le projet:

```bash
   npm start
```

## ⛓️ Endpoints API

- Importer la collection dans postman pour une documentation des endpoints : [collection_postman](API-Training.postman_collection.json) ;

## ⚙️ Fonctionnalités

### 👨🏻‍🎓 Gestion des Apprenants

- **Lister les apprenants**;
- **Ajouter un apprenant** avec des informations telles que : nom complet, tuteur, adresse, date de naissance, lieu de naissance, numéro téléphone, adresse email;
- **Modifier un apprenant** avec des informations telles que : nom complet, tuteur, adresse, numéro téléphone, adresse email;
- **Supprimer un apprenant**.

### 📚 Gestion des Modules

- **Lister les modules**;
- **Ajouter une module** avec des informations telle que : nom, durée, prix;
- **Modifier une module** avec des informations telle que : nom, durée, prix;
- **Supprimer une module**.

### 📝 Gestion des Inscriptions

- **Lister les inscriptions**;
- **Ajouter une inscription** avec des informations telle que : date d'inscription, date de début, date de fin, montant, apprenant et module;
- **Modifier une inscription** avec des informations telle que : date d'inscription, date de début, date de fin, montant, apprenant et module;
- **Supprimer une inscription**.

### 📜 Gestion des Paiements

- **Lister les paiements**;
- **Ajouter une paiement** avec des informations telle que : date de paiement, montant, payeur, numéro téléphone payeur, mode de paiement et inscription;
- **Supprimer une paiement**.

## 📊 Génération des données par Seed

```bash
npm run seed
```

## 🧕🏽 Auteur

[Aichetou Gaye](https://github.com/Aichetou-Gaye)
