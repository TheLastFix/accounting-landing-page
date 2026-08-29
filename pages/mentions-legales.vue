<script setup lang="ts">
useHead({
  title: "Mentions légales | OneSnap",
  meta: [
    {
      name: "description",
      content:
        "Mentions légales du site OneSnap : éditeur, hébergeur, propriété intellectuelle et droit applicable.",
    },
  ],
});

const editor = {
  name: "OneSnap",
  owner: "Florent Lambercier (entreprise individuelle)",
  address: "Route de la Neuveville 61, 2515 Prêles, Suisse",
  // Fill in the IDE/UID only if the business is registered in the Swiss
  // register of commerce; leave empty for an unregistered sole proprietorship.
  idNumber: "",
};

const host = {
  name: "Clever Cloud SAS",
  address: "4 rue Voltaire, 44000 Nantes, France",
  rcs: "RCS Nantes 524 172 699 — SIRET 524 172 699 00034",
  vat: "FR87524172699",
};
</script>

<template>
  <div class="font-body antialiased">
    <UiSection variant="dark" center>
      <span class="section-label block mb-3">Informations légales</span>
      <h1 class="section-title-light mt-4 mb-4">Mentions légales</h1>
      <p class="text-white-60 max-w-2xl mx-auto">
        Dernière mise à jour : 10 août 2026
      </p>
    </UiSection>

    <UiSection variant="light">
      <div class="max-w-3xl mx-auto">
        <!-- 1. Éditeur -->
        <section class="mt-10">
          <h2 class="sub-title-dark mb-3">1. Éditeur du site</h2>
          <div class="body-dark space-y-3">
            <p>
              Le site <strong class="text-dark">onesnap.ch</strong> est édité
              par :
            </p>
            <p>
              <strong class="text-dark">{{ editor.name }}</strong> —
              {{ editor.owner }}<br />
              {{ editor.address }}<br />
              <template v-if="editor.idNumber">
                N° d'entreprise : {{ editor.idNumber }}<br />
              </template>
              E-mail : contact@onesnap.ch
            </p>
          </div>
        </section>

        <!-- 2. Hébergeur -->
        <section class="mt-10">
          <h2 class="sub-title-dark mb-3">2. Hébergeur</h2>
          <div class="body-dark space-y-3">
            <p>Le site est hébergé par :</p>
            <p>
              <strong class="text-dark">{{ host.name }}</strong><br />
              {{ host.address }}<br />
              {{ host.rcs }}<br />
              Numéro de TVA : {{ host.vat }}
            </p>
            <p>
              Les serveurs de l'application, de la base de données et du
              stockage des documents sont situés en France (région de Paris).
            </p>
          </div>
        </section>

        <!-- 3. Propriété intellectuelle -->
        <section class="mt-10">
          <h2 class="sub-title-dark mb-3">3. Propriété intellectuelle</h2>
          <div class="body-dark space-y-3">
            <p>
              La marque OneSnap, le logo, les textes, les illustrations et
              l'ensemble des éléments du site sont protégés par le droit de la
              propriété intellectuelle. Toute reproduction, représentation ou
              diffusion, totale ou partielle, sans autorisation écrite
              préalable de l'éditeur est interdite.
            </p>
          </div>
        </section>

        <!-- 4. Responsabilité -->
        <section class="mt-10">
          <h2 class="sub-title-dark mb-3">4. Responsabilité</h2>
          <div class="body-dark space-y-3">
            <p>
              OneSnap met tout en œuvre pour assurer la disponibilité et
              l'exactitude des informations publiées sur ce site, sans
              garantie absolue. Le contenu des documents transmis par les
              utilisateurs relève de leur seule responsabilité. OneSnap ne
              saurait être tenu responsable des interruptions ou dommages
              résultant de l'intervention de tiers (hébergeur, fournisseurs de
              services) ou d'un cas de force majeure.
            </p>
          </div>
        </section>

        <!-- 5. Protection des données -->
        <section class="mt-10">
          <h2 class="sub-title-dark mb-3">5. Protection des données</h2>
          <div class="body-dark space-y-3">
            <p>
              Le traitement des données personnelles est décrit dans notre
              <NuxtLink
                to="/protection-des-donnees"
                class="text-accent-dark font-medium hover:underline"
              >
                politique de protection des données
              </NuxtLink>
              .
            </p>
          </div>
        </section>

        <!-- 6. Droit applicable -->
        <section class="mt-10">
          <h2 class="sub-title-dark mb-3">6. Droit applicable</h2>
          <div class="body-dark space-y-3">
            <p>
              Le présent site est soumis au droit suisse. En cas de litige, le
              for est au siège de l'éditeur, sous réserve des dispositions
              impératives.
            </p>
          </div>
        </section>
      </div>
    </UiSection>
  </div>
</template>
