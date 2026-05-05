<template>
  <div class="font-body antialiased">
    <!-- HERO -->
    <UiSection
      variant="dark"
      narrow
      center
      full-height
      class="bg-no-repeat bg-cover bg-left"
      style="background-image: url(&quot;/Home.svg&quot;)"
    >
      <div class="text-center">
        <h1 class="title text-white mt-8 mb-6">
          Complexe, long et onéreux <br />
          On sait ce que c'est.<br />
        </h1>
        <p class="text-accent text-xl mb-12">
          Ta comptabilité en une photo. Les peties mains font le reste.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center mb-6">
          <UiButton
            variant="outline"
            href="#comment"
            size="lg"
            class="!text-white !border-accent !border-2 hover:!bg-accent hover:!text-dark"
            >Comment ça marche</UiButton
          >
          <UiButton variant="accent" href="#" size="lg"
            >Essayer gratuitement</UiButton
          >
        </div>
        <p class="text-white/40 text-sm">30 jours gratuits. Sans engagement.</p>
        <div class="mt-10 h-[350px]">
          <img
            src="/public/home-2.svg"
            alt="OneSnap - image representant les peties mains qui sont heureux en traitant les factures car c'est plus simple mtn."
            class="w-full h-full object-contain"
          />
        </div>
      </div>
    </UiSection>

    <!-- FLOW COMPARISON -->
    <UiSection
      variant="light"
      subtitle="Le workflow"
      title="Tu as dis gain de temps ?"
      fullWidth
    >
      <div
        class="grid grid-cols-1 md:grid-cols-2 items-start"
        style="background-color: var(--color-light-title)"
      >
        <div class="pl-52 pr-12 py-20">
          <h3 class="sub-title-dark text-right mb-6">
            La réalité de la comptabilité
          </h3>
          <div class="relative">
            <img
              src="/regular-flow.svg"
              alt="Le flux comptable classique"
              class="w-full h-auto"
            />
            <div class="absolute inset-0 pointer-events-none">
              <span
                v-for="(ann, i) in regularAnnotations"
                :key="i"
                class="absolute leading-relaxed"
                :class="'card-title-dark'"
                :style="{
                  left: ann.x + '%',
                  top: ann.y + '%',
                  transform: 'translateY(-0.3em)',
                }"
              >
                {{ ann.text }}
              </span>
            </div>
            <div
              class="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-xl px-5 py-2 shadow-lg"
            >
              <span class="text-5xl font-bold text-dark font-title">37</span>
              <span class="text-lg text-middle ml-2">jours</span>
            </div>
          </div>
          <p class="card-title-dark mt-8 h-24">
            Bilan J+37 : déjà obsolète.
            <br />
            Tu paies pour la saisie, pas pour de la stratégie.
            <br />
            Un coût caché énorme pour ton entreprise.
          </p>
        </div>
        <div class="bg-dark rounded-l-2xl pr-52 pl-12 py-20">
          <h3 class="sub-title-light mb-6">Avec OneSnap</h3>
          <div class="relative">
            <img
              src="/onesnap-flow.svg"
              alt="Le flux comptable avec OneSnap"
              class="w-full h-auto"
            />
            <div class="absolute inset-0 pointer-events-none">
              <span
                v-for="(ann, i) in onesnapAnnotations"
                :key="i"
                class="absolute leading-relaxed"
                :class="'card-title-light'"
                :style="{
                  left: ann.x + '%',
                  top: ann.y + '%',
                  transform: 'translateY(-0.3em)',
                }"
              >
                {{ ann.text }}
              </span>
            </div>
            <div
              class="absolute bottom-4 left-4 bg-dark/80 backdrop-blur-sm rounded-xl px-5 py-2 shadow-lg border border-white/10"
            >
              <span class="text-5xl font-bold text-accent font-title">3</span>
              <span class="text-lg text-white/60 ml-2">jours</span>
            </div>
          </div>
          <p class="card-title-light mt-8 h-24">
            Les données sont à jour et offrent une vision financière complète
            dans un dashboard clair : chiffre d'affaires, liquidité, paiements,
            etc.
          </p>
        </div>
      </div>
      <div class="max-w-4xl mx-auto mt-36">
        <img
          src="/dashboard.png"
          alt="OneSnap - dashboard"
          class="w-full rounded-2xl shadow-2xl"
        />
      </div>
    </UiSection>

    <!-- COMMENT CA MARCHE -->
    <UiSection
      variant="light"
      subtitle="OneSnap, comment ça marche"
      title="3 étapes. C'est tout."
    >
      <div class="space-y-12">
        <!-- Step 1 -->
        <div>
          <div class="flex items-center gap-3 mb-6">
            <span
              class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-accent text-dark font-title text-lg"
              >1</span
            >
            <h3 class="sub-title-dark">Transfère les justificatifs</h3>
          </div>
          <UiCardGrid :cols="3">
            <UiCard variant="light">
              <div class="flex justify-center mb-4">
                <svg
                  class="w-8 h-8 text-accent"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z"
                  />
                </svg>
              </div>
              <h4 class="card-title-dark mb-2">Par photo via WhatsApp</h4>
              <p class="body-dark">
                Prends les reçus en photo et envoie-les directement par
                WhatsApp.
              </p>
            </UiCard>
            <UiCard variant="light">
              <div class="flex justify-center mb-4">
                <svg
                  class="w-8 h-8 text-accent"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                  />
                </svg>
              </div>
              <h4 class="card-title-dark mb-2">En pièces jointes par email</h4>
              <p class="body-dark">
                Transfère les factures par email, elles arrivent
                automatiquement.
              </p>
            </UiCard>
            <UiCard variant="light">
              <div class="flex justify-center mb-4">
                <svg
                  class="w-8 h-8 text-accent"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                  />
                </svg>
              </div>
              <h4 class="card-title-dark mb-2">Manuellement dans l'app</h4>
              <p class="body-dark">
                Importe les PDF ou images directement dans l'application web.
              </p>
            </UiCard>
          </UiCardGrid>
        </div>

        <!-- Steps 2 & 3 -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="relative">
            <img
              src="/how-it-works.svg"
              alt=""
              class="absolute right-full top-1/2 -translate-y-1/2 max-h-full w-auto"
            />
            <UiCard variant="dark">
              <span
                class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-accent text-dark font-title text-lg mb-4"
                >2</span
              >
              <h3 class="sub-title-light mb-2">
                Les peties mains s'en occupent
              </h3>
              <p class="body-light">
                Les données sont extraites, triées, catégorisées au fur et à
                mesure pour une comptabilité toujours à jour.
              </p>
            </UiCard>
          </div>
          <UiCard variant="dark">
            <span
              class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-accent text-dark font-title text-lg mb-4"
              >3</span
            >
            <h3 class="sub-title-light mb-2">
              Une vision claire, moins de stress
            </h3>
            <p class="body-light">
              Tu as une vision financière claire de ton entreprise pour prendre
              les bonnes décisions.
            </p>
          </UiCard>
        </div>
      </div>
    </UiSection>

    <!-- FONCTIONNALITES -->
    <UiSection
      variant="dark"
      subtitle="Fonctionnalités"
      title="Tout ce qu'il te faut. Rien de superflu."
    >
      <UiFeatureList :features="features" />
      <div class="grid grid-cols-1 md:grid-cols-1 items-start mt-28">
        <img
          src="/public/mockup-hero.png"
          alt="OneSnap - Interface de gestion de factures"
          class="w-full rounded-2xl shadow-2xl"
        />
      </div>
    </UiSection>

    <!-- CONFIANCE -->
    <UiSection
      variant="light"
      subtitle="Confidentialité"
      title="Tes données, c'est toi qui décides."
    >
      <UiCardGrid :cols="2">
        <UiCard
          v-for="c in confiance"
          :key="c.title"
          variant="light"
          align="left"
        >
          <h3 class="card-title-dark mb-2">{{ c.title }}</h3>
          <p class="body-dark text-sm leading-relaxed">{{ c.desc }}</p>
        </UiCard>
      </UiCardGrid>
    </UiSection>

    <!-- PRIX -->
    <UiSection
      id="prix"
      variant="dark"
      subtitle="Tarif"
      title="Simple. Comme tout le reste."
    >
      <UiCardGrid :cols="3">
        <UiPricingCard
          name="Standard"
          price="19 CHF"
          tagline="Le logiciel."
          :features="[
            'Import illimité',
            'Extraction automatique',
            'Catégorisation',
            'TVA suisse',
            'Dashboard temps réel',
            'Partage fiduciaire',
            'Support email',
          ]"
          cta-label="Essayer 30 jours gratuits"
          cta-href="#"
          note="Sans carte bancaire. Sans engagement."
        />
        <UiPricingCard
          name="Pro"
          price="49 CHF"
          tagline="Le logiciel + vérification."
          highlighted
          :features="[
            'Tout dans Standard',
            'Vérification par un expert',
            'Écritures comptables validées',
            'Déclarations TVA préparées',
            'Support prioritaire',
          ]"
          cta-label="Essayer 30 jours gratuits"
          cta-href="#"
          note="Sans carte bancaire. Sans engagement."
        />
        <UiPricingCard
          name="Complet"
          price="99 CHF"
          tagline="On remplace ta fiduciaire."
          :features="[
            'Tout dans Pro',
            'Bouclement annuel',
            'Conseil fiscal personnalisé',
            'Déclarations TVA déposées',
            'Interlocuteur dédié',
          ]"
          cta-label="Essayer 30 jours gratuits"
          cta-href="#"
          note="Sans carte bancaire. Sans engagement."
        />
      </UiCardGrid>
    </UiSection>

    <!-- FAQ -->
    <UiSection id="faq" variant="light" narrow title="Questions fréquentes">
      <div class="flex flex-col gap-3">
        <UiFaqItem v-for="f in faqs" :key="f.q">
          <template #question>{{ f.q }}</template>
          <template #answer>{{ f.a }}</template>
        </UiFaqItem>
      </div>
    </UiSection>

    <UiFooter />
  </div>
</template>

<script setup lang="ts">
import flowAnnotations from "~/data/flow-annotations.json";

const regularAnnotations =
  flowAnnotations["public/regular-flow.svg"].annotations;
const onesnapAnnotations =
  flowAnnotations["public/onesnap-flow.svg"].annotations;
const features = [
  {
    icon: "M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5",
    title: "Importation intelligente",
    desc: "Import de documents (PDF, scans…) depuis différentes sources.",
  },
  {
    icon: "m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z",
    title: "Extraction automatique",
    desc: "OCR et extraction structurée des données.",
  },
  {
    icon: "M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z",
    title: "Catégorisation",
    desc: "Classification automatique des factures et transactions.",
  },
  {
    icon: "M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10",
    title: "Écritures comptables",
    desc: "Génération automatique des écritures comptables.",
  },
  {
    icon: "M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z",
    title: "Tableau de bord",
    desc: "Vision temps réel — trésorerie, CA, charges, rentabilité.",
  },
  {
    icon: "M3 3v1.5M3 21v-6m0 0l2.77-.693a9 9 0 016.208.682l.108.054a9 9 0 006.086.71l3.114-.732a48.524 48.524 0 01-.005-10.499l-3.11.732a9 9 0 01-6.085-.711l-.108-.054a9 9 0 00-6.208-.682L3 4.5M3 15V4.5",
    title: "TVA suisse",
    desc: "Gestion des régimes : normal, DFN, partiel, exonéré.",
  },
  {
    icon: "M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5",
    title: "Multi devises",
    desc: "Gestion des transactions dans plusieurs devises.",
  },
  {
    icon: "M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z",
    title: "Espaces partagés",
    desc: "Espace partagé comptable / client / tiers.",
  },
  {
    icon: "M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
    title: "Revue et validation",
    desc: "Revue et validation des documents par un expert comptable.",
  },
  {
    icon: "M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5",
    title: "Bouclement annuel",
    desc: "Bouclement annuel de la comptabilité.",
  },
];

// Befifices :
// - temps gagné : montré dans le flow
// - tableau de bord : montré dans le flow
// - plus de classeurs : montré dans le flow
// - adapté a la suisse : montré dans les fonctionnalités
const benefices = [
  {
    icon: "💰",
    title: "La facture réduite",
    desc: "Plus de saisie manuelle = facture réduite pour toi.",
  },
  {
    icon: "⚡",
    title: "Rien à installer",
    desc: "Pas de migration. Pas de formation. Tu continues avec ta fiduciaire comme avant.",
  },
];

const confiance = [
  {
    title: "Hébergé en Europe",
    desc: "Serveurs certifiés, protégés par le RGPD. Pas de CLOUD Act américain.",
  },
  {
    title: "Swiss made",
    desc: "Développé en suisse, suppport en suisse. Éligible au label Swiss Made Software",
  },
  {
    title: "Tu exportes tout, quand tu veux",
    desc: "PDF, Excel, formats comptables. Pas de lock-in. Si tu pars, tu repars avec tout.",
  },
];

const faqs = [
  {
    q: "Est-ce que ça remplace ma fiduciaire ?",
    a: `Non, OneSnap n'a pas vocation à remplacer votre fiduciaire. OneSnap automatise la partie la plus chronophage : la saisie, la catégorisation et l'extraction des données comptables. Votre fiduciaire conserve le conseil fiscal, le bouclement annuel et les décisions stratégiques.

    C'est ce qu'on appelle le modèle **"pré-comptabilité parfaite"** : vous arrivez chez votre fiduciaire avec une comptabilité déjà prête, et vous ne payez que pour la valeur ajoutée (conseil, optimisation), pas pour la saisie.`,
  },
  {
    q: "Est-ce que mon fiduciaire peut travailler avec OneSnap ?",
    a: `Oui, OneSnap est conçu pour s'intégrer dans le flux de travail existant des fiduciaires.

    La plateforme permet :
    
    - Un espace partagé comptable / client / tiers
    - L'export structuré des écritures comptables
    - La revue et validation par un expert directement dans l'outil
    
    Les fiduciaires suisses font face à une pénurie de personnel qualifié (80 % des cabinets ont moins de 10 employés). OneSnap automatise la saisie qu'ils n'ont plus les ressources humaines pour effectuer, leur permettant de se concentrer sur le conseil.`,
  },
  {
    q: "Est-ce que je vais comprendre comment ça marche ?",
    a: `OneSnap a été conçu pour des entrepreneurs qui ne sont pas à l'aise avec l'administratif, la comptabilité ou l'informatique.

    Pas de configuration complexe, pas de connaissance comptable requise.`,
  },
  {
    q: "OneSnap est-il fiable ?",
    a: "Tes données t'appartiennent. Tu peux tout exporter, quand tu veux. PDF, Excel, formats comptables. Pas de lock-in. Si tu pars, tu repars avec tout.",
  },
  {
    q: "Ma fiduciaire va-t-elle accepter ?",
    a: "Les fiduciaires adorent OneSnap. Elles reçoivent les données déjà prêtes, font moins de travail de base, et se concentrent sur ce qui compte : le conseil. Si ta fiduciaire résiste, dis-nous. On peut lui montrer.",
  },
  {
    q: "Je n'ai pas le temps de mettre en place un nouveau système.",
    a: "Pas de migration. Pas de changement de fiduciaire. Pas de formation. Tu importes tes factures ici — au lieu de les mettre dans un classeur. 3 minutes et c'est parti.",
  },
];
</script>
