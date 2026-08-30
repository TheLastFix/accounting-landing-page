<template>
  <div class="font-body antialiased">
    <!-- HERO -->
    <UiSection id="home" variant="dark" narrow center full-height>
      <div class="text-center">
        <span class="section-label block mb-3"
          >La comptabilité sans effort</span
        >
        <h1 class="section-title-light mt-4 mb-6">
          Une photo, et c'est comptabilisé.
        </h1>
        <p class="text-accent text-lg md:text-xl mb-10">
          30 minutes par mois pour une vision financière nette. <br />
          Laisse OneSnap s'occuper du reste.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center mb-6">
          <UiButton variant="accent" to="/contact" size="lg"
            >Essayer gratuitement</UiButton
          >
          <UiButton
            variant="outline"
            href="#workflow"
            size="lg"
            class="!text-white !border-accent !border-2 hover:!bg-accent hover:!text-dark"
            >Comment ça marche</UiButton
          >
        </div>
        <p class="text-white/80 text-sm">
          ✓ 30 jours gratuits · ✓ Sans engagement · ✓ Configuration en 2 min
        </p>
        <p class="text-white/60 text-sm mt-1">
          Pensé pour les indépendants, PME et startups en Suisse.
        </p>
        <div class="mt-4 md:mt-10 h-[250px] md:h-[350px]">
          <img
            src="~/assets/images/home-2.svg"
            alt="OneSnap - Ton équipe en backup qui s'active pour trier tes factures avec le sourire."
            class="w-full h-full object-contain"
          />
        </div>
      </div>
    </UiSection>

    <!-- FLOW COMPARISON -->
    <UiSection
      v-for="s in flowSections"
      :key="s.id"
      :id="s.id"
      variant="middle"
      :class="s.className"
    >
      <UiFlowBlock
        :vertical="s.vertical"
        :card-dark="s.cardDark"
        :annotations-dark="s.cardDark"
        :badge-dark="s.cardDark"
        :text-light="s.cardDark"
        :title="flows[s.flow].title"
        :value="flows[s.flow].value"
        :unit="flows[s.flow].unit"
        :image="flows[s.flow][s.format].image"
        :alt="flows[s.flow][s.format].alt"
        :annotations="flows[s.flow][s.format].annotations"
        :caption="flows[s.flow].caption"
      >
        <template v-if="s.flow === 'avecOneSnap'" #video>
          <UiVideo
            :webm-src="`${cdnUrl}/videos/dashboard.webm`"
            :mp4-src="`${cdnUrl}/videos/dashboard.mp4`"
            :poster-src="`${cdnUrl}/videos/dashboard-poster.jpg`"
            alt-text="Demo du Dashboard Analytics"
          />
        </template>
      </UiFlowBlock>
    </UiSection>

    <!-- COMMENT CA MARCHE -->
    <UiSection
      id="how-it-works"
      variant="light"
      subtitle="OneSnap, comment ça marche"
      title="3 étapes. C'est tout."
    >
      <UiTabs
        :tabs="[
          {
            key: 'step1',
            number: 1,
            title: 'Transfère les justificatifs',
            shortTitle: 'Transférer',
          },
          {
            key: 'step2',
            number: 2,
            title: 'OneSnap traite les données',
            shortTitle: 'Traitement',
          },
          {
            key: 'step3',
            number: 3,
            title: 'Une vision claire',
            shortTitle: 'Résultats',
          },
        ]"
      >
        <template #tab-step1>
          <UiCardGrid :cols="3">
            <UiCard variant="light" class="h-full">
              <div
                class="flex items-center justify-center gap-3 mb-4 lg:flex-col lg:items-center lg:gap-3"
              >
                <svg
                  class="w-8 h-8 shrink-0 text-accent"
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
                <h4 class="card-title-dark">Par photo via WhatsApp</h4>
              </div>
              <p class="body-dark">
                Prends les reçus en photo et envoie-les directement par
                WhatsApp.
              </p>
            </UiCard>
            <UiCard variant="light" class="h-full">
              <div
                class="flex items-center justify-center gap-3 mb-4 lg:flex-col lg:items-center lg:gap-3"
              >
                <svg
                  class="w-8 h-8 shrink-0 text-accent"
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
                <h4 class="card-title-dark">En pièces jointes par e-mail</h4>
              </div>
              <p class="body-dark">
                Transfère les factures par e-mail, elles arrivent
                automatiquement.
              </p>
            </UiCard>
            <UiCard variant="light" class="h-full">
              <div
                class="flex items-center justify-center gap-3 mb-4 lg:flex-col lg:items-center lg:gap-3"
              >
                <svg
                  class="w-8 h-8 shrink-0 text-accent"
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
                <h4 class="card-title-dark">Manuellement dans l'app</h4>
              </div>
              <p class="body-dark">
                Importe les PDF ou images directement dans l'application web.
              </p>
            </UiCard>
          </UiCardGrid>
        </template>

        <template #tab-step2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <UiCard variant="light" class="h-full">
              <div
                class="flex items-center justify-center gap-3 mb-4 lg:flex-col lg:items-center lg:gap-3"
              >
                <svg
                  class="w-8 h-8 shrink-0 text-accent"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456Z"
                  />
                </svg>
                <h4 class="card-title-dark">Traitement automatique</h4>
              </div>
              <p class="body-dark">
                Les données sont extraites, triées, catégorisées au fur et à
                mesure pour une comptabilité toujours à jour.
              </p>
            </UiCard>
            <UiCard variant="light" class="h-full">
              <div
                class="flex items-center justify-center gap-3 mb-4 lg:flex-col lg:items-center lg:gap-3"
              >
                <svg
                  class="w-8 h-8 shrink-0 text-accent"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
                <h4 class="card-title-dark">Validation des données</h4>
              </div>
              <p class="body-dark">
                Notre équipe valide les derniers détails pour te garantir des
                entrées comptables parfaitement générées.
              </p>
            </UiCard>
          </div>
        </template>

        <template #tab-step3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <UiCard variant="light" class="h-full">
              <div
                class="flex items-center justify-center gap-3 mb-4 lg:flex-col lg:items-center lg:gap-3"
              >
                <svg
                  class="w-8 h-8 shrink-0 text-accent"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
                <h4 class="card-title-dark">Tableau de bord simplifié</h4>
              </div>
              <p class="body-dark">
                Tu as une vision financière claire de ton entreprise pour
                prendre les bonnes décisions.
              </p>
            </UiCard>
            <UiCard variant="light" class="h-full">
              <div
                class="flex items-center justify-center gap-3 mb-4 lg:flex-col lg:items-center lg:gap-3"
              >
                <svg
                  class="w-8 h-8 shrink-0 text-accent"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z"
                  />
                </svg>
                <h4 class="card-title-dark">Tout est suivi en temps réel</h4>
              </div>
              <p class="body-dark">
                Impayés, factures payées, trésorerie : suis tes finances en un
                coup d'œil, sans classeur.
              </p>
            </UiCard>
          </div>
        </template>
      </UiTabs>
    </UiSection>

    <!-- FONCTIONNALITES -->
    <UiSection
      id="features"
      variant="dark"
      subtitle="Fonctionnalités"
      title="Tout ce qu'il te faut. Rien de superflu."
    >
      <UiFeatureList :features="features" />
      <!-- TODO: Réactiver le dashboard quand il sera prêt
      <div class="grid grid-cols-1 md:grid-cols-1 items-start mt-28">
        <img
          src="~/assets/images/mockup-hero.png"
          alt="OneSnap - Interface de gestion de factures"
          class="w-full rounded-2xl shadow-2xl"
        />
      </div>
      -->
    </UiSection>

    <!-- CONFIANCE -->
    <UiSection
      variant="light"
      subtitle="Confidentialité"
      title="Tes données, c'est toi qui décides."
    >
      <UiCardGrid :cols="3">
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

    <!-- PRIX (caché - remplacé par la section demo)
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
            'Support e-mail',
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
    -->

    <!-- DEMO -->
    <UiSection id="demo" variant="light">
      <div
        class="bg-dark rounded-2xl shadow-lg p-8 md:p-14 flex flex-col md:flex-row md:items-center md:justify-between gap-8"
      >
        <div>
          <h2 class="section-title-light mb-4">Voir OneSnap en action.</h2>
          <p class="text-white/80 text-lg max-w-xl">
            Tu veux voir comment ça fonctionne concrètement ? Test le service
            gratuitement pendant 30 jours, sans engagement.
          </p>
          <p class="text-white/60 text-sm mt-2">
            contact@onesnap.ch — réponse sous 24h
          </p>
        </div>
        <div class="flex flex-col items-center md:items-end gap-3 shrink-0">
          <NuxtLink
            to="/contact"
            class="inline-flex items-center gap-3 px-8 py-4 bg-accent text-dark font-title text-xl rounded-xl hover:bg-accent/90 transition-colors"
          >
            <svg
              class="w-6 h-6"
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
            Tester gratuitement
          </NuxtLink>
          <p class="text-white/60 text-xs text-center md:text-right">
            ✓ 30 jours gratuits · ✓ Sans carte de crédit · ✓ Configuration en 2
            min
          </p>
        </div>
      </div>
    </UiSection>

    <!-- FAQ -->
    <UiSection id="faq" variant="light" narrow title="Questions fréquentes">
      <div class="flex flex-col gap-3">
        <UiFaqItem v-for="f in faqs" :key="f.q">
          <template #question>{{ f.q }}</template>
          <template #answer
            ><span v-html="f.a.replace(/\n/g, '<br>')"
          /></template>
        </UiFaqItem>
      </div>
    </UiSection>
  </div>
</template>

<script setup lang="ts">
import flowAnnotations from "~/data/flow-annotations.json";
import regularFlowHorizontal from "~/assets/images/regular-flow-horizontal.svg";
import onesnapFlowHorizontal from "~/assets/images/onesnap-flow-horizontal.svg";
import regularFlowVertical from "~/assets/images/regular-flow-vertical.svg";
import onesnapFlowVertical from "~/assets/images/onesnap-flow-vertical.svg";

const config = useRuntimeConfig();
const cdnUrl = config.public.cdnUrl || "";

const regularAnnotations = flowAnnotations[
  "assets/images/regular-flow-horizontal.svg"
].annotations
  .slice()
  .sort((a, b) => a.x - b.x);
const onesnapAnnotations = flowAnnotations[
  "assets/images/onesnap-flow-horizontal.svg"
].annotations
  .slice()
  .sort((a, b) => a.x - b.x);
const regularVerticalAnnotations = flowAnnotations[
  "assets/images/regular-flow-vertical.svg"
].annotations
  .filter((a) => a.x <= 100 && a.y <= 100)
  .slice()
  .sort((a, b) => a.y - b.y);
const onesnapVerticalAnnotations = flowAnnotations[
  "assets/images/onesnap-flow-vertical.svg"
].annotations
  .slice()
  .sort((a, b) => a.y - b.y);

// Source de vérité unique pour la comparaison de flows (DRY)
const flows = {
  sansOneSnap: {
    title: "Sans OneSnap",
    value: "5-15",
    unit: "heures",
    caption:
      "Des heures de paperasse perdues. Quand tes chiffres sont enfin prêts, ils datent déjà de plusieurs mois et tu avances à l'aveugle.",
    horizontal: {
      image: regularFlowHorizontal,
      alt: "Le flux comptable classique",
      annotations: regularAnnotations,
    },
    vertical: {
      image: regularFlowVertical,
      alt: "Le flux comptable classique",
      annotations: regularVerticalAnnotations,
    },
  },
  avecOneSnap: {
    title: "Avec OneSnap",
    value: "30",
    unit: "minutes",
    caption:
      "Un coup d'œil sur ton téléphone, et tu sais exactement où va ton argent. Zéro saisie, zéro prise de tête.",
    horizontal: {
      image: onesnapFlowHorizontal,
      alt: "Le flux comptable avec OneSnap",
      annotations: onesnapAnnotations,
    },
    vertical: {
      image: onesnapFlowVertical,
      alt: "Le flux comptable avec OneSnap",
      annotations: onesnapVerticalAnnotations,
    },
  },
};

// Les 4 sections de comparaison (2 formats × 2 flows)
// Fond clair continu partout ; "Avec OneSnap" est une carte sombre isolée
type FlowKey = "sansOneSnap" | "avecOneSnap";

interface FlowSection {
  id: string;
  flow: FlowKey;
  format: "horizontal" | "vertical";
  className: string;
  vertical: boolean;
  cardDark: boolean;
}

const flowSections: FlowSection[] = [
  {
    id: "workflow",
    flow: "sansOneSnap",
    format: "horizontal",
    className: "hidden lg:block !pb-6",
    vertical: false,
    cardDark: false,
  },
  {
    id: "workflow-onesnap",
    flow: "avecOneSnap",
    format: "horizontal",
    className: "hidden lg:block !pt-6",
    vertical: false,
    cardDark: true,
  },
  {
    id: "workflow-mobile",
    flow: "sansOneSnap",
    format: "vertical",
    className: "lg:hidden !pb-6",
    vertical: true,
    cardDark: false,
  },
  {
    id: "workflow-mobile-onesnap",
    flow: "avecOneSnap",
    format: "vertical",
    className: "lg:hidden !pt-6",
    vertical: true,
    cardDark: true,
  },
];
const features = [
  {
    icon: "M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z",
    title: "Espace partagé",
    desc: "Un accès dédié pour ton comptable. Fini les e-mails de relance et les pièces jointes oubliées. Ton comptable a son propre espace pour tout récupérer en autonomie.",
    badge: "✓ Accès comptable",
  },
  {
    icon: "M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
    title: "Reconnaissance des paiements",
    desc: "Rapprochement bancaire automatique. Chaque paiement reçu est reconnu et lié instantanément à la bonne facture. Tu sais tout de suite ce qui est réglé.",
    span: "md:col-span-2",
    badge: "✓ 100% automatique",
  },
  {
    icon: "M3 3v1.5M3 21v-6m0 0l2.77-.693a9 9 0 016.208.682l.108.054a9 9 0 006.086.71l3.114-.732a48.524 48.524 0 01-.005-10.499l-3.11.732a9 9 0 01-6.085-.711l-.108-.054a9 9 0 00-6.208-.682L3 4.5M3 15V4.5",
    title: "TVA suisse",
    desc: "Prêt pour la TVA suisse, quel que soit ton régime. Normal, taux de dette fiscale nette (DFN), partiel ou exonéré : OneSnap applique les bonnes règles d'office.",
    span: "md:col-span-2",
    badge: "✓ 100% Suisse",
  },
  {
    icon: "M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z",
    title: "Multi-devises",
    desc: "Gestion multi-devises sans prise de tête. Factures en CHF, EUR, USD ou autre ? L'outil gère les transactions et les conversions proprement.",
    badge: "CHF · EUR · USD",
  },
];

const confiance = [
  {
    title: "Hébergé en Europe",
    desc: "Serveurs certifiés, protégés par la RGPD et nLPD. Pas de CLOUD Act américain.",
  },
  {
    title: "Swiss made",
    desc: "Développement et support en Suisse.",
  },
  {
    title: "Tu exportes tes données à tout moment",
    desc: "Export groupé des entrées, résultats et documents.",
  },
];

const faqs = [
  {
    q: "Est-ce que OneSnap remplace totalement mon comptable ou ma fiduciaire ?",
    a: "Oui, pour toute la partie comptable ! On s'occupe de tout de A à Z : saisie des pièces, bouclements, décomptes de TVA et bilan. Tu as la puissance d'une application moderne couplée à une vraie gestion comptable professionnelle, le tout à un tarif fixe.",
  },
  {
    q: "Comment se passe la transition ?",
    a: "Pas de migration, pas de temps perdu. Il suffit de transmettre à OneSnap les derniers états financiers de l'entreprise. OneSnap s'occupe du reste.",
  },
  {
    q: "Qu'est-ce que je dois faire au quotidien ?",
    a: "Presque rien. Ton seul rôle est de transmettre tes justificatifs au fur et à mesure (via WhatsApp, e-mail ou l'application). Notre équipe et nos outils s'occupent du reste : traitement, vérification, catégorisation et écritures comptables.",
  },
  {
    q: "Est-ce que les décomptes de TVA et le bilan annuel sont inclus ?",
    a: "Absolument. On gère l'intégralité de tes obligations légales : décomptes de TVA suisses (effectif ou DFN), clôture d'exercice, bilan annuel et compte de résultat prêts pour l'administration fiscale.",
  },
  {
    q: "Que se passe-t-il si j'ai une question ou besoin d'un conseil ?",
    a: "Tu n'es pas seul face à un écran. Même si l'application est ultra simple, tu as un interlocuteur dédié joignable pour répondre à tes questions sur ta comptabilité ou tes décomptes.",
  },
  {
    q: "Mes données sont-elles en sécurité et puis-je les récupérer ?",
    a: "Tes données sont hébergées en Europe et traitées selon la nLPD suisse. Elles t'appartiennent à 100% : tu peux tout exporter (bilans, pièces, journaux comptables) à tout moment en un clic. Aucun verrouillage.",
  },
];
</script>
