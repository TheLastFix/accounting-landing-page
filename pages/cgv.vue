<script setup lang="ts">
useHead({
  title: "Conditions générales de vente | OneSnap",
  meta: [
    {
      name: "description",
      content:
        "Conditions générales de vente de OneSnap : service, crédits, paiement, obligations des clients et résiliation.",
    },
  ],
});

// DRAFT: prices are not decided yet. Fill in the sections marked
// "À DÉFINIR" once pricing is fixed, then remove the draft notice.
</script>

<template>
  <div class="font-body antialiased">
    <UiSection variant="dark" center>
      <span class="section-label block mb-3">Conditions générales</span>
      <h1 class="section-title-light mt-4 mb-4">
        Conditions générales de vente
      </h1>
      <p class="text-white-60 max-w-2xl mx-auto">
        Dernière mise à jour : 10 août 2026
      </p>
    </UiSection>

    <UiSection variant="light">
      <div class="max-w-3xl mx-auto">
        <div
          class="bg-accent-bg rounded-2xl border border-accent p-5 mb-8 flex items-start gap-3"
        >
          <span class="text-accent-dark shrink-0">⚠</span>
          <p class="body-dark">
            <strong class="text-dark">Ébauche :</strong> les sections « prix »
            et « paiement » sont volontairement laissées vides tant que les
            tarifs ne sont pas décidés. Ce document devra être relu par un
            juriste avant publication.
          </p>
        </div>

        <!-- 1. Objet -->
        <section class="mt-10">
          <h2 class="sub-title-dark mb-3">1. Objet</h2>
          <div class="body-dark space-y-3">
            <p>
              Les présentes conditions générales de vente (CGV) régissent la
              fourniture du service de comptabilité OneSnap (l'« application »),
              édité par OneSnap, Route de la Neuveville 61, 2515 Prêles, Suisse
              (l'« éditeur »), à destination des indépendants, PME et startups
              en Suisse (le « client »).
            </p>
            <p>
              L'application permet la transmission de justificatifs (factures,
              reçus, relevés bancaires, scans), leur traitement par intelligence
              artificielle et la tenue de la comptabilité du client : écritures,
              facturation, TVA, règlements et rapports financiers.
            </p>
          </div>
        </section>

        <!-- 2. Compte et accès -->
        <section class="mt-10">
          <h2 class="sub-title-dark mb-3">2. Compte et accès</h2>
          <div class="body-dark space-y-3">
            <ul class="space-y-1.5">
              <li class="flex gap-2">
                <span class="text-accent-dark shrink-0">•</span>
                <span>
                  L'accès au service est réservé au client et aux membres qu'il
                  invite, avec des rôles distincts (administrateur, comptable,
                  lecteur) ;
                </span>
              </li>
              <li class="flex gap-2">
                <span class="text-accent-dark shrink-0">•</span>
                <span>
                  Le client est responsable de la confidentialité de ses
                  identifiants et de l'utilisation du service par les membres de
                  son entreprise ;
                </span>
              </li>
              <li class="flex gap-2">
                <span class="text-accent-dark shrink-0">•</span>
                <span>
                  Le client garantit l'exactitude des informations saisies lors
                  de l'inscription et les tient à jour.
                </span>
              </li>
            </ul>
          </div>
        </section>

        <!-- 3. Crédits -->
        <section class="mt-10">
          <h2 class="sub-title-dark mb-3">3. Crédits</h2>
          <div class="body-dark space-y-3">
            <p>
              Le service fonctionne avec un système de crédits prépayés, attaché
              à l'entreprise du client :
            </p>
            <ul class="space-y-1.5">
              <li class="flex gap-2">
                <span class="text-accent-dark shrink-0">•</span>
                <span>
                  le traitement d'un document (facture, reçu, scan) consomme
                  <strong class="text-dark">1 crédit par page</strong> ;
                </span>
              </li>
              <li class="flex gap-2">
                <span class="text-accent-dark shrink-0">•</span>
                <span>
                  les crédits sont débités après le succès du traitement ; en
                  cas d'échec définitif, ils sont automatiquement remboursés ;
                </span>
              </li>
              <li class="flex gap-2">
                <span class="text-accent-dark shrink-0">•</span>
                <span>
                  les relevés bancaires au format XML sont traités sans
                  consommation de crédits ;
                </span>
              </li>
              <li class="flex gap-2">
                <span class="text-accent-dark shrink-0">•</span>
                <span>
                  <strong class="text-dark">50 crédits offerts</strong> à la
                  création de l'entreprise, sans engagement.
                </span>
              </li>
            </ul>
            <p>
              Les crédits n'ont pas de valeur monétaire et ne sont ni
              remboursables en espèces ni transférables, hors dispositions
              légales impératives.
            </p>
          </div>
        </section>

        <!-- 4. Prix et paiement -->
        <section class="mt-10">
          <h2 class="sub-title-dark mb-3">4. Prix et paiement</h2>
          <div class="bg-accent-bg rounded-2xl border border-accent p-5 mb-3">
            <p class="body-dark">
              <strong class="text-dark">À DÉFINIR :</strong> cette section sera
              complétée dès que les tarifs seront fixés.
            </p>
          </div>
          <div class="body-dark space-y-3">
            <p>Structure prévue :</p>
            <ul class="space-y-1.5">
              <li class="flex gap-2">
                <span class="text-accent-dark shrink-0">•</span>
                <span>
                  prix des crédits : <em>[à définir, ex. CHF 1.00 / crédit]</em>
                  ;
                </span>
              </li>
              <li class="flex gap-2">
                <span class="text-accent-dark shrink-0">•</span>
                <span>
                  offres et abonnements :
                  <em>[à définir, ex. 19 / 49 / 99 CHF par mois]</em> ;
                </span>
              </li>
              <li class="flex gap-2">
                <span class="text-accent-dark shrink-0">•</span>
                <span>
                  moyens de paiement acceptés :
                  <em>[à définir, ex. virement bancaire, QR-bill, carte]</em> ;
                </span>
              </li>
              <li class="flex gap-2">
                <span class="text-accent-dark shrink-0">•</span>
                <span>
                  facturation et délais de paiement :
                  <em>[à définir]</em> ;
                </span>
              </li>
              <li class="flex gap-2">
                <span class="text-accent-dark shrink-0">•</span>
                <span>
                  offres promotionnelles (essai gratuit, crédits offerts) :
                  <em>[à définir]</em>.
                </span>
              </li>
            </ul>
          </div>
        </section>

        <!-- 5. Utilisation du service -->
        <section class="mt-10">
          <h2 class="sub-title-dark mb-3">5. Utilisation du service</h2>
          <div class="body-dark space-y-3">
            <ul class="space-y-1.5">
              <li class="flex gap-2">
                <span class="text-accent-dark shrink-0">•</span>
                <span>
                  le client transmet ses justificatifs via l'application,
                  l'e-mail ou WhatsApp ;
                </span>
              </li>
              <li class="flex gap-2">
                <span class="text-accent-dark shrink-0">•</span>
                <span>
                  l'éditeur traite les documents par intelligence artificielle
                  afin d'en extraire les données comptables ; le résultat est
                  présenté au client pour validation ;
                </span>
              </li>
              <li class="flex gap-2">
                <span class="text-accent-dark shrink-0">•</span>
                <span>
                  le client s'interdit toute utilisation du service contraire à
                  la loi, notamment le traitement de documents qu'il n'a pas le
                  droit de traiter.
                </span>
              </li>
            </ul>
          </div>
        </section>

        <!-- 6. Obligations du client -->
        <section class="mt-10">
          <h2 class="sub-title-dark mb-3">6. Obligations du client</h2>
          <div class="body-dark space-y-3">
            <p>
              Le client reste responsable de l'exactitude des données saisies et
              de la conservation des pièces comptables exigée par la loi (en
              Suisse, dix ans au sens de l'art. 958f CO). L'éditeur ne se
              substitue pas à cette obligation, ni à celle de faire vérifier les
              comptes par un professionnel qualifié si la loi l'exige.
            </p>
          </div>
        </section>

        <!-- 7. Protection des données -->
        <section class="mt-10">
          <h2 class="sub-title-dark mb-3">7. Protection des données</h2>
          <div class="body-dark space-y-3">
            <p>
              Le traitement des données personnelles est décrit dans la
              <NuxtLink
                to="/protection-des-donnees"
                class="text-accent-dark font-medium hover:underline"
              >
                politique de protection des données
              </NuxtLink>
              . Le client, responsable de ses données d'affaires, confie leur
              traitement à l'éditeur en qualité de sous-traitant, conformément à
              la loi suisse sur la protection des données (nLPD) et au RGPD.
            </p>
          </div>
        </section>

        <!-- 8. Disponibilité et responsabilité -->
        <section class="mt-10">
          <h2 class="sub-title-dark mb-3">
            8. Disponibilité et responsabilité
          </h2>
          <div class="body-dark space-y-3">
            <ul class="space-y-1.5">
              <li class="flex gap-2">
                <span class="text-accent-dark shrink-0">•</span>
                <span>
                  l'éditeur s'efforce d'assurer une disponibilité élevée du
                  service, sans garantie absolue ; des interruptions planifiées
                  (maintenance) ou liées à des tiers peuvent survenir ;
                </span>
              </li>
              <li class="flex gap-2">
                <span class="text-accent-dark shrink-0">•</span>
                <span>
                  la responsabilité de l'éditeur est limitée aux dommages
                  directs et prévisibles, dans les limites de la loi ; elle est
                  exclue en cas de force majeure ou de faute du client.
                </span>
              </li>
            </ul>
          </div>
        </section>

        <!-- 9. Résiliation et sortie de données -->
        <section class="mt-10">
          <h2 class="sub-title-dark mb-3">
            9. Résiliation et sortie de données
          </h2>
          <div class="body-dark space-y-3">
            <ul class="space-y-1.5">
              <li class="flex gap-2">
                <span class="text-accent-dark shrink-0">•</span>
                <span>
                  le client peut résilier à tout moment ;
                  <em>[délais et préavis : à définir]</em> ;
                </span>
              </li>
              <li class="flex gap-2">
                <span class="text-accent-dark shrink-0">•</span>
                <span>
                  à tout moment, le client peut exporter ses données et ses
                  documents depuis l'application (CSV, ZIP), sans verrouillage ;
                </span>
              </li>
              <li class="flex gap-2">
                <span class="text-accent-dark shrink-0">•</span>
                <span>
                  la suppression de l'entreprise entraîne la suppression
                  définitive de toutes les données, documents compris ;
                  <em>[délai de récupération après résiliation : à définir]</em>
                  ;
                </span>
              </li>
              <li class="flex gap-2">
                <span class="text-accent-dark shrink-0">•</span>
                <span>
                  les crédits non consommés :
                  <em>[remboursement ou non : à définir]</em>.
                </span>
              </li>
            </ul>
          </div>
        </section>

        <!-- 10. Propriété intellectuelle -->
        <section class="mt-10">
          <h2 class="sub-title-dark mb-3">10. Propriété intellectuelle</h2>
          <div class="body-dark space-y-3">
            <p>
              L'application, sa marque, son logo et ses contenus sont la
              propriété de l'éditeur. Le client bénéficie d'un droit d'usage
              limité, personnel et non exclusif, pour la durée de la relation
              contractuelle. Les données du client lui restent la propriété.
            </p>
          </div>
        </section>

        <!-- 11. Droit applicable -->
        <section class="mt-10">
          <h2 class="sub-title-dark mb-3">11. Droit applicable</h2>
          <div class="body-dark space-y-3">
            <p>
              Les présentes CGV sont soumises au droit suisse. En cas de litige,
              le for est au siège de l'éditeur, sous réserve des dispositions
              impératives.
            </p>
          </div>
        </section>
      </div>
    </UiSection>
  </div>
</template>
