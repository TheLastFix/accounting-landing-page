<script setup lang="ts">
useHead({
  title: "Protection des données | OneSnap",
  meta: [
    {
      name: "description",
      content:
        "Politique de protection des données de OneSnap : données collectées, finalités, sous-traitants, conservation, sécurité et droits des personnes (nLPD, RGPD).",
    },
  ],
});

const editor = {
  name: "OneSnap",
  address: "Route de la Neuveville 61, 2515 Prêles, Suisse",
  // Fill in the IDE/UID only if the business is registered in the Swiss
  // register of commerce; leave empty for an unregistered sole proprietorship.
  idNumber: "",
};

const toc = [
  { href: "#responsable", label: "Responsable du traitement" },
  { href: "#donnees", label: "Données collectées" },
  { href: "#finalites", label: "Finalités et bases légales" },
  { href: "#sous-traitants", label: "Sous-traitants et transferts" },
  { href: "#conservation", label: "Conservation des données" },
  { href: "#securite", label: "Sécurité" },
  { href: "#droits", label: "Vos droits" },
  { href: "#cookies", label: "Cookies" },
  { href: "#contact", label: "Contact" },
];

const dataCategories = [
  {
    title: "Données de compte",
    items: [
      "Adresse e-mail et identifiant de connexion",
      "Nom, prénom et mot de passe (stocké de manière chiffrée)",
      "Numéro de téléphone WhatsApp et statut de vérification (facultatif)",
      "Langue préférée de l'interface",
    ],
  },
  {
    title: "Données d'entreprise",
    items: [
      "Nom de l'entreprise, langue et configuration comptable",
      "Membres de l'équipe et leurs rôles (administrateur, comptable, lecteur)",
    ],
  },
  {
    title: "Données de contacts et de facturation",
    items: [
      "Nom, adresse postale, téléphone et e-mail des clients et fournisseurs",
      "Numéro de TVA et IBAN",
      "Transactions bancaires, factures (y compris QR-bill) et écritures comptables",
    ],
  },
  {
    title: "Documents et contenu extrait",
    items: [
      "Justificatifs transmis : factures, reçus, relevés bancaires, scans (PDF, images, XML)",
      "Texte et données extraits automatiquement de ces documents par notre système d'intelligence artificielle",
    ],
  },
  {
    title: "Messages WhatsApp",
    items: [
      "Numéro de téléphone émetteur et contenu des messages reçus sur notre numéro WhatsApp",
    ],
  },
  {
    title: "Données techniques",
    items: [
      "Journaux de fonctionnement et mesures de sécurité (empreintes de fichiers, journaux d'accès)",
    ],
  },
];

const processors = [
  {
    name: "Clever Cloud",
    role: "Hébergement de l'application, de la base de données et stockage des documents",
    location: "France (Paris)",
  },
  {
    name: "Mistral AI",
    role: "Extraction et reconnaissance de documents (OCR)",
    location: "Union européenne",
  },
  {
    name: "OpenAI, Anthropic",
    role: "Analyse et extraction de données depuis les documents",
    location:
      "États-Unis — transfert encadré par des clauses contractuelles types",
  },
  {
    name: "Infomaniak",
    role: "Envoi des e-mails transactionnels (vérifications, invitations)",
    location: "Suisse",
  },
  {
    name: "Meta (WhatsApp)",
    role: "Réception de vos messages et pièces jointes sur notre numéro WhatsApp",
    location:
      "États-Unis — transfert encadré par des clauses contractuelles types",
  },
  {
    name: "Frankfurter",
    role: "Taux de change (aucune donnée personnelle transmise)",
    location: "—",
  },
];
</script>

<template>
  <div class="font-body antialiased">
    <UiSection variant="dark" center>
      <span class="section-label block mb-3">Protection des données</span>
      <h1 class="section-title-light mt-4 mb-4">
        Politique de protection des données
      </h1>
      <p class="text-white-60 max-w-2xl mx-auto">
        Dernière mise à jour : 10 août 2026
      </p>
    </UiSection>

    <UiSection variant="light">
      <div class="max-w-3xl mx-auto">
        <p class="body-dark mb-8">
          Chez OneSnap, la protection de vos données est une priorité. Cette
          politique explique quelles données sont collectées, comment elles sont
          utilisées et quels sont vos droits, conformément à la loi suisse sur
          la protection des données (nLPD) et au Règlement général sur la
          protection des données (RGPD) de l'Union européenne.
        </p>

        <nav class="bg-white rounded-2xl border border-border-subtle p-6 mb-12">
          <p class="section-label mb-3">Sommaire</p>
          <ul class="grid sm:grid-cols-2 gap-2">
            <li v-for="item in toc" :key="item.href">
              <a
                :href="item.href"
                class="text-accent-dark font-medium hover:underline"
              >
                {{ item.label }}
              </a>
            </li>
          </ul>
        </nav>

        <!-- 1. Responsable du traitement -->
        <section id="responsable" class="mt-10">
          <h2 class="sub-title-dark mb-3">1. Responsable du traitement</h2>
          <div class="body-dark space-y-3">
            <p>Le responsable du traitement des données personnelles est :</p>
            <p>
              <strong class="text-dark">{{ editor.name }}</strong
              ><br />
              {{ editor.address }}<br />
              <template v-if="editor.idNumber">
                N° d'entreprise : {{ editor.idNumber }}<br />
              </template>
              E-mail : contact@onesnap.ch
            </p>
            <p>
              OneSnap joue un double rôle : il est
              <strong class="text-dark">responsable du traitement</strong>
              pour les données de compte de ses utilisateurs (e-mail, mot de
              passe, préférences), et
              <strong class="text-dark">sous-traitant</strong> pour les données
              d'affaires que vous nous confiez (contacts, factures, documents),
              dont vous restez responsable en qualité de client.
            </p>
          </div>
        </section>

        <!-- 2. Données collectées -->
        <section id="donnees" class="mt-10">
          <h2 class="sub-title-dark mb-3">2. Données collectées</h2>
          <div class="space-y-4">
            <div
              v-for="cat in dataCategories"
              :key="cat.title"
              class="bg-white rounded-2xl border border-border-subtle p-5"
            >
              <p class="font-semibold text-dark mb-2">{{ cat.title }}</p>
              <ul class="body-dark space-y-1.5">
                <li v-for="item in cat.items" :key="item" class="flex gap-2">
                  <span class="text-accent-dark shrink-0">•</span>
                  <span>{{ item }}</span>
                </li>
              </ul>
            </div>
          </div>
          <p class="body-dark mt-4">
            Nous ne collectons aucune donnée sensible au sens de la loi
            (origine, santé, opinions) sauf si elle figure dans les documents
            que vous choisissez de nous transmettre.
          </p>
        </section>

        <!-- 3. Finalités et bases légales -->
        <section id="finalites" class="mt-10">
          <h2 class="sub-title-dark mb-3">3. Finalités et bases légales</h2>
          <div class="body-dark space-y-3">
            <p>Vos données sont traitées pour les finalités suivantes :</p>
            <ul class="space-y-1.5">
              <li class="flex gap-2">
                <span class="text-accent-dark shrink-0">•</span>
                <span>
                  <strong class="text-dark">Exécution du contrat :</strong>
                  fourniture du service (compte, traitement des documents,
                  facturation, comptabilité, export de vos données) ;
                </span>
              </li>
              <li class="flex gap-2">
                <span class="text-accent-dark shrink-0">•</span>
                <span>
                  <strong class="text-dark">Obligations légales :</strong>
                  obligations comptables et fiscales auxquelles vous êtes soumis
                  en tant que client ;
                </span>
              </li>
              <li class="flex gap-2">
                <span class="text-accent-dark shrink-0">•</span>
                <span>
                  <strong class="text-dark">Intérêt légitime :</strong>
                  sécurité du service, prévention des abus et amélioration de
                  nos fonctionnalités.
                </span>
              </li>
            </ul>
            <p>
              Nous ne vendons jamais vos données et ne les utilisons pas à des
              fins publicitaires.
            </p>
          </div>
        </section>

        <!-- 4. Sous-traitants et transferts -->
        <section id="sous-traitants" class="mt-10">
          <h2 class="sub-title-dark mb-3">
            4. Sous-traitants et transferts de données
          </h2>
          <p class="body-dark mb-4">
            Pour fournir le service, nous faisons appel à des prestataires
            sélectionnés, tous liés par des contrats de traitement des données
            (DPA) :
          </p>
          <div class="space-y-3">
            <div
              v-for="p in processors"
              :key="p.name"
              class="bg-white rounded-2xl border border-border-subtle p-5"
            >
              <p class="font-semibold text-dark">{{ p.name }}</p>
              <p class="body-dark text-sm">{{ p.role }}</p>
              <p class="text-accent-dark text-sm font-medium">
                {{ p.location }}
              </p>
            </div>
          </div>
          <p class="body-dark mt-4">
            Vos documents peuvent être transmis à nos fournisseurs
            d'intelligence artificielle afin d'en extraire les données
            comptables. Les transferts vers des pays hors de l'Union européenne
            et de la Suisse sont encadrés par les clauses contractuelles types
            de la Commission européenne, conformément aux exigences de la nLPD
            et du RGPD.
          </p>
        </section>

        <!-- 5. Conservation -->
        <section id="conservation" class="mt-10">
          <h2 class="sub-title-dark mb-3">5. Conservation des données</h2>
          <div class="body-dark space-y-3">
            <p>
              Vos données sont conservées uniquement pendant la durée nécessaire
              aux finalités décrites ci-dessus :
            </p>
            <ul class="space-y-1.5">
              <li class="flex gap-2">
                <span class="text-accent-dark shrink-0">•</span>
                <span>
                  les données de compte sont conservées aussi longtemps que
                  votre compte est actif ;
                </span>
              </li>
              <li class="flex gap-2">
                <span class="text-accent-dark shrink-0">•</span>
                <span>
                  vos documents et données d'affaires restent disponibles tant
                  que vous ne les supprimez pas, et vous pouvez les supprimer ou
                  les exporter à tout moment ;
                </span>
              </li>
              <li class="flex gap-2">
                <span class="text-accent-dark shrink-0">•</span>
                <span>
                  la suppression de votre entreprise entraîne la suppression
                  définitive de toutes vos données, documents compris.
                </span>
              </li>
            </ul>
            <p>
              Vous restez responsable de la conservation des pièces comptables
              exigée par la loi (en Suisse, dix ans au sens de l'art. 958f CO).
              OneSnap ne peut pas se substituer à cette obligation.
            </p>
          </div>
        </section>

        <!-- 6. Sécurité -->
        <section id="securite" class="mt-10">
          <h2 class="sub-title-dark mb-3">6. Sécurité</h2>
          <div class="body-dark space-y-3">
            <p>
              Nous mettons en œuvre des mesures techniques et organisationnelles
              adaptées à la sensibilité des données :
            </p>
            <ul class="space-y-1.5">
              <li class="flex gap-2">
                <span class="text-accent-dark shrink-0">•</span>
                <span>
                  chiffrement des échanges (TLS) et authentification par jetons
                  à durée limitée ;
                </span>
              </li>
              <li class="flex gap-2">
                <span class="text-accent-dark shrink-0">•</span>
                <span>
                  isolation stricte des données entre entreprises au niveau de
                  la base de données (sécurité au niveau des lignes) ;
                </span>
              </li>
              <li class="flex gap-2">
                <span class="text-accent-dark shrink-0">•</span>
                <span>
                  mots de passe stockés de manière chiffrée et jamais en clair ;
                </span>
              </li>
              <li class="flex gap-2">
                <span class="text-accent-dark shrink-0">•</span>
                <span>
                  stockage des documents dans un espace privé, accessible
                  uniquement par des liens signés et temporaires ;
                </span>
              </li>
              <li class="flex gap-2">
                <span class="text-accent-dark shrink-0">•</span>
                <span>
                  contrôle d'accès par rôles (administrateur, comptable,
                  lecteur) et limites de tentatives de connexion.
                </span>
              </li>
            </ul>
          </div>
        </section>

        <!-- 7. Vos droits -->
        <section id="droits" class="mt-10">
          <h2 class="sub-title-dark mb-3">7. Vos droits</h2>
          <div class="body-dark space-y-3">
            <p>Conformément à la nLPD et au RGPD, vous disposez de droits :</p>
            <ul class="space-y-1.5">
              <li class="flex gap-2">
                <span class="text-accent-dark shrink-0">•</span>
                <span>
                  <strong class="text-dark">d'accès</strong> à vos données ;
                </span>
              </li>
              <li class="flex gap-2">
                <span class="text-accent-dark shrink-0">•</span>
                <span>
                  <strong class="text-dark">de rectification</strong> des
                  données inexactes ;
                </span>
              </li>
              <li class="flex gap-2">
                <span class="text-accent-dark shrink-0">•</span>
                <span>
                  <strong class="text-dark">de suppression</strong> de vos
                  données (suppression du compte ou de l'entreprise) ;
                </span>
              </li>
              <li class="flex gap-2">
                <span class="text-accent-dark shrink-0">•</span>
                <span>
                  <strong class="text-dark">de portabilité</strong> : vous
                  pouvez exporter vos données et vos documents à tout moment
                  depuis l'application (CSV, ZIP) ;
                </span>
              </li>
              <li class="flex gap-2">
                <span class="text-accent-dark shrink-0">•</span>
                <span>
                  <strong class="text-dark">d'opposition</strong> et de
                  limitation du traitement, dans les conditions prévues par la
                  loi.
                </span>
              </li>
            </ul>
            <p>
              Pour exercer ces droits, écrivez-nous à contact@onesnap.ch. Nous
              répondons sous 30 jours. Vous pouvez également adresser une
              réclamation à l'autorité de protection des données compétente (en
              Suisse, le Préposé fédéral à la protection des données et à la
              transparence).
            </p>
          </div>
        </section>

        <!-- 8. Cookies -->
        <section id="cookies" class="mt-10">
          <h2 class="sub-title-dark mb-3">8. Cookies</h2>
          <div class="body-dark space-y-3">
            <p>
              Le site utilise uniquement des cookies techniques nécessaires au
              fonctionnement du service (session, sécurité). Nous n'utilisons
              aucun traceur publicitaire ni outil d'analyse tiers.
            </p>
          </div>
        </section>

        <!-- 9. Contact -->
        <section id="contact" class="mt-10">
          <h2 class="sub-title-dark mb-3">9. Contact</h2>
          <div class="body-dark space-y-3">
            <p>
              Pour toute question relative à cette politique ou à la protection
              de vos données, contactez-nous :
            </p>
            <p>
              <strong class="text-dark">{{ editor.name }}</strong
              ><br />
              {{ editor.address }}<br />
              <template v-if="editor.idNumber">
                N° d'entreprise : {{ editor.idNumber }}<br />
              </template>
              E-mail : contact@onesnap.ch
            </p>
          </div>
        </section>
      </div>
    </UiSection>
  </div>
</template>
