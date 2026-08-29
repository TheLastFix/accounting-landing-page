<script setup lang="ts">
import { ref } from "vue";

useHead({
  title: "Contact | OneSnap",
  meta: [
    {
      name: "description",
      content:
        "Contactez l'équipe OneSnap : une question, une démo ou un retour ? Écrivez-nous, nous vous répondons rapidement.",
    },
  ],
});

const config = useRuntimeConfig();
const name = ref("");
const email = ref("");
const message = ref("");
const errors = ref<{ name?: string; email?: string; message?: string }>({});
const status = ref<"idle" | "submitting" | "success" | "error">("idle");

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(): boolean {
  const next: typeof errors.value = {};
  if (!name.value.trim()) next.name = "Veuillez indiquer votre nom.";
  if (!email.value.trim()) next.email = "Veuillez indiquer votre e-mail.";
  else if (!EMAIL_RE.test(email.value))
    next.email = "Cette adresse e-mail semble invalide.";
  if (!message.value.trim()) next.message = "Veuillez écrire votre message.";
  errors.value = next;
  return Object.keys(next).length === 0;
}

async function handleSubmit() {
  if (status.value === "submitting") return;
  if (!validate()) return;

  status.value = "submitting";
  errors.value = {};
  try {
    await $fetch(`${config.public.apiBaseUrl}/api/contact-inquiry/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: {
        name: name.value.trim(),
        email: email.value.trim(),
        message: message.value.trim(),
      },
    });
    status.value = "success";
    name.value = "";
    email.value = "";
    message.value = "";
  } catch {
    status.value = "error";
  }
}
</script>

<template>
  <div class="font-body antialiased">
    <UiSection variant="dark" center>
      <span class="section-label block mb-3">Contact</span>
      <h1 class="section-title-light mt-4 mb-4">Parlons de votre comptabilité</h1>
      <p class="text-white-60 max-w-2xl mx-auto">
        Une question, une demande de démo ou un retour ? Écrivez-nous, nous
        vous répondrons rapidement.
      </p>
    </UiSection>

    <UiSection variant="dark">
      <div class="max-w-3xl mx-auto">
        <div
          v-if="status === 'success'"
          class="bg-accent/10 border border-accent rounded-2xl p-5 mb-8 flex items-start gap-3"
          role="status"
        >
          <span class="text-accent shrink-0">✓</span>
          <p class="text-white/80">
            <strong class="text-white">Merci !</strong> Votre message a bien été
            envoyé, nous vous répondrons dans les plus brefs délais.
          </p>
        </div>

        <div
          v-else-if="status === 'error'"
          class="bg-red-500/10 border border-red-400 rounded-2xl p-5 mb-8 flex items-start gap-3"
          role="alert"
        >
          <span class="text-red-400 shrink-0">✕</span>
          <p class="text-white/80">
            <strong class="text-white">Oups.</strong> Une erreur est survenue
            lors de l'envoi. Veuillez réessayer dans quelques instants, ou
            écrivez-nous directement à
            <a href="mailto:contact@onesnap.ch" class="text-accent underline"
              >contact@onesnap.ch</a
            >.
          </p>
        </div>

        <form class="flex flex-col gap-6" novalidate @submit.prevent="handleSubmit">
          <div class="grid md:grid-cols-2 gap-6">
            <UiInput
              v-model="name"
              label="Votre nom"
              placeholder="Jean Dupont"
              :error="errors.name"
              autocomplete="name"
            />
            <UiInput
              v-model="email"
              type="email"
              label="Votre e-mail"
              placeholder="jean@exemple.ch"
              :error="errors.email"
              autocomplete="email"
            />
          </div>
          <UiTextarea
            v-model="message"
            label="Votre message"
            placeholder="Bonjour, je souhaite en savoir plus sur OneSnap…"
            :error="errors.message"
            :rows="6"
          />
          <div class="flex items-center justify-between gap-4">
            <p class="text-sm text-white-60">
              En envoyant ce formulaire, vos données ne servent qu'à vous
              répondre. Voir notre
              <NuxtLink
                to="/protection-des-donnees"
                class="text-accent underline"
                >politique de protection des données</NuxtLink
              >.
            </p>
            <UiButton
              type="submit"
              variant="accent"
              size="lg"
              :disabled="status === 'submitting'"
              class="shrink-0 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {{ status === "submitting" ? "Envoi en cours…" : "Envoyer" }}
            </UiButton>
          </div>
        </form>
      </div>
    </UiSection>
  </div>
</template>
