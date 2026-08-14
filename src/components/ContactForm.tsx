"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/Button";
import { OFFER_BLOCKS } from "@/lib/offers";

const CONTACT_EMAIL = "contact@ydformation.fr";

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState(OFFER_BLOCKS[0]?.title ?? "");
  const [message, setMessage] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const body = [
      `Nom : ${name}`,
      `Email : ${email}`,
      `Sujet : ${subject}`,
      "",
      message,
    ].join("\n");
    const mailto = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
      `[Site YD Formation] ${subject}`
    )}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block text-sm font-medium text-ink">
          Nom
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1.5 w-full rounded-xl border border-ink/15 px-4 py-3 text-sm text-ink focus:border-primary focus:outline-none"
            placeholder="Votre nom"
          />
        </label>
        <label className="block text-sm font-medium text-ink">
          Email
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1.5 w-full rounded-xl border border-ink/15 px-4 py-3 text-sm text-ink focus:border-primary focus:outline-none"
            placeholder="vous@exemple.fr"
          />
        </label>
      </div>

      <label className="block text-sm font-medium text-ink">
        Sujet
        <select
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="mt-1.5 w-full rounded-xl border border-ink/15 bg-white px-4 py-3 text-sm text-ink focus:border-primary focus:outline-none"
        >
          {OFFER_BLOCKS.map((block) => (
            <option key={block.slug} value={block.title}>
              {block.title}
            </option>
          ))}
          <option value="Autre demande">Autre demande</option>
        </select>
      </label>

      <label className="block text-sm font-medium text-ink">
        Votre message
        <textarea
          required
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="mt-1.5 w-full rounded-xl border border-ink/15 px-4 py-3 text-sm text-ink focus:border-primary focus:outline-none"
          placeholder="Décrivez votre situation et votre objectif en quelques lignes."
        />
      </label>

      <Button type="submit" className="w-full sm:w-auto">
        Envoyer ma demande
      </Button>
      <p className="text-xs text-ink-soft">
        L&apos;envoi ouvre votre messagerie avec un email pré-rempli à destination de{" "}
        {CONTACT_EMAIL}.
      </p>
    </form>
  );
}
