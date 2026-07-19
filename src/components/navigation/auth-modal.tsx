"use client";

import { useState, type FormEvent } from "react";

import { ActionButton, ActionButtons } from "@/components/ui/action-buttons";
import { FormField } from "@/components/ui/form-field";
import { Modal } from "@/components/ui/modal";
import { cn } from "@/lib/utils";

type AuthTab = "login" | "register";

type AuthModalProps = {
  onClose: () => void;
};

export function AuthModal({ onClose }: AuthModalProps) {
  const [activeTab, setActiveTab] = useState<AuthTab>("login");
  const [message, setMessage] = useState<string | null>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>, tab: AuthTab) {
    event.preventDefault();
    setMessage(
      tab === "login"
        ? "Anmeldung wird später implementiert."
        : "Registrierung wird später implementiert.",
    );
  }

  return (
    <Modal
      title="Konto"
      description="Anmeldung und Registrierung werden als Platzhalter vorbereitet."
      onClose={onClose}
      maxWidthClassName="max-w-[420px]"
    >
      <div className="space-y-4">
        <div className="flex gap-2 rounded-xl bg-[#f9fafb] p-1">
          <button
            type="button"
            onClick={() => {
              setActiveTab("login");
              setMessage(null);
            }}
            className={cn(
              "flex-1 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
              activeTab === "login"
                ? "bg-white text-thw-navy shadow-sm"
                : "text-thw-steel",
            )}
          >
            Anmelden
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveTab("register");
              setMessage(null);
            }}
            className={cn(
              "flex-1 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
              activeTab === "register"
                ? "bg-white text-thw-navy shadow-sm"
                : "text-thw-steel",
            )}
          >
            Konto erstellen
          </button>
        </div>

        {activeTab === "login" ? (
          <form className="space-y-4" onSubmit={(event) => handleSubmit(event, "login")}>
            <FormField label="E-Mail">
              <input
                type="email"
                required
                className="w-full rounded-lg border border-thw-ice bg-white px-3 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-[#cfe1f2]"
              />
            </FormField>

            <FormField label="Passwort">
              <input
                type="password"
                required
                className="w-full rounded-lg border border-thw-ice bg-white px-3 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-[#cfe1f2]"
              />
            </FormField>

            <ActionButtons>
              <ActionButton type="submit" variant="primary" className="w-full">
                Anmelden
              </ActionButton>
            </ActionButtons>
          </form>
        ) : (
          <form
            className="space-y-4"
            onSubmit={(event) => handleSubmit(event, "register")}
          >
            <FormField label="Name">
              <input
                type="text"
                required
                className="w-full rounded-lg border border-thw-ice bg-white px-3 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-[#cfe1f2]"
              />
            </FormField>

            <FormField label="E-Mail">
              <input
                type="email"
                required
                className="w-full rounded-lg border border-thw-ice bg-white px-3 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-[#cfe1f2]"
              />
            </FormField>

            <FormField label="Passwort">
              <input
                type="password"
                required
                className="w-full rounded-lg border border-thw-ice bg-white px-3 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-[#cfe1f2]"
              />
            </FormField>

            <FormField label="Passwort bestätigen">
              <input
                type="password"
                required
                className="w-full rounded-lg border border-thw-ice bg-white px-3 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-[#cfe1f2]"
              />
            </FormField>

            <ActionButtons>
              <ActionButton type="submit" variant="primary" className="w-full">
                Konto erstellen
              </ActionButton>
            </ActionButtons>
          </form>
        )}

        {message ? (
          <p className="rounded-lg border border-thw-ice bg-[#f9fafb] px-3 py-2 text-sm text-thw-steel">
            {message}
          </p>
        ) : null}
      </div>
    </Modal>
  );
}