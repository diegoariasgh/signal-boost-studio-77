import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

type State =
  | { kind: "validating" }
  | { kind: "ready" }
  | { kind: "already" }
  | { kind: "invalid" }
  | { kind: "submitting" }
  | { kind: "success" }
  | { kind: "error"; message: string };

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string;

const Unsubscribe = () => {
  const [params] = useSearchParams();
  const token = params.get("token");
  const [state, setState] = useState<State>({ kind: "validating" });

  useEffect(() => {
    if (!token) {
      setState({ kind: "invalid" });
      return;
    }
    (async () => {
      try {
        const res = await fetch(
          `${SUPABASE_URL}/functions/v1/handle-email-unsubscribe?token=${encodeURIComponent(token)}`,
          { headers: { apikey: SUPABASE_ANON_KEY } },
        );
        const data = await res.json().catch(() => ({}));
        if (!res.ok) {
          setState({ kind: "invalid" });
          return;
        }
        if (data?.reason === "already_unsubscribed") {
          setState({ kind: "already" });
          return;
        }
        if (data?.valid === true) {
          setState({ kind: "ready" });
          return;
        }
        setState({ kind: "invalid" });
      } catch {
        setState({ kind: "invalid" });
      }
    })();
  }, [token]);

  const confirm = async () => {
    if (!token) return;
    setState({ kind: "submitting" });
    try {
      const { data, error } = await supabase.functions.invoke(
        "handle-email-unsubscribe",
        { body: { token } },
      );
      if (error) throw error;
      if (data?.success || data?.reason === "already_unsubscribed") {
        setState({ kind: "success" });
        return;
      }
      setState({ kind: "error", message: "Something went wrong." });
    } catch (e) {
      setState({
        kind: "error",
        message: e instanceof Error ? e.message : "Something went wrong.",
      });
    }
  };

  return (
    <main className="min-h-screen bg-background text-foreground flex items-center justify-center px-6 py-16">
      <div className="max-w-md w-full text-center space-y-6">
        <h1 className="text-3xl font-semibold">Email preferences</h1>

        {state.kind === "validating" && (
          <p className="text-slate-light/70">Checking your link…</p>
        )}

        {state.kind === "ready" && (
          <>
            <p className="text-slate-light/80">
              Click below to unsubscribe from Signalworks emails.
            </p>
            <Button onClick={confirm} size="lg" className="bg-electric hover:bg-electric-light text-white">
              Confirm unsubscribe
            </Button>
          </>
        )}

        {state.kind === "submitting" && (
          <p className="text-slate-light/70">Processing…</p>
        )}

        {state.kind === "success" && (
          <p className="text-slate-light/80">
            You've been unsubscribed. You won't receive further emails from us.
          </p>
        )}

        {state.kind === "already" && (
          <p className="text-slate-light/80">This email is already unsubscribed.</p>
        )}

        {state.kind === "invalid" && (
          <p className="text-slate-light/80">
            This unsubscribe link is invalid or has expired.
          </p>
        )}

        {state.kind === "error" && (
          <p className="text-red-400">{state.message}</p>
        )}

        <div>
          <Link to="/" className="text-electric hover:underline text-sm">
            Back to Signalworks
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Unsubscribe;
