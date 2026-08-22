import { LetterDecoder } from "@/components/LetterDecoder";

export default function DecodeurPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-ink">Décrypteur de courrier</h1>
        <p className="mt-1 text-ink-soft">
          Colle une lettre administrative, on t&apos;explique ce qu&apos;elle veut
          dire.
        </p>
      </div>

      <LetterDecoder />
    </div>
  );
}
