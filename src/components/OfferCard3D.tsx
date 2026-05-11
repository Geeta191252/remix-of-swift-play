import { motion } from "framer-motion";
import megaDealImg from "@/assets/offers/mega-deal-dollar.png";
import specialOfferImg from "@/assets/offers/special-offer-star.png";

export interface OfferCard3DData {
  _id: string;
  title?: string;
  payAmount: number;
  payCurrency: "star" | "dollar";
  getAmount: number;
  bonusLabel?: string;
  valueLabel?: string;
}

interface Props {
  offer: OfferCard3DData;
  onClaim: () => void;
  busy?: boolean;
  compact?: boolean;
}

// Parse "+100 ⭐" / "+$10" / "100" → numeric amount
const parseBonusAmount = (label?: string): number | null => {
  if (!label) return null;
  const m = label.match(/(\d+(?:\.\d+)?)/);
  if (!m) return null;
  const n = parseFloat(m[1]);
  return n > 0 ? n : null;
};

// Extract a percent (e.g. "80% OFF", "120% VALUE") for the starburst badge
const parsePercent = (label?: string): string | null => {
  if (!label) return null;
  const m = label.match(/(\d+)\s*%/);
  return m ? `${m[1]}%` : null;
};

const OfferCard3D = ({ offer, onClaim, busy }: Props) => {
  const isDollar = offer.payCurrency === "dollar";
  const heroImg = isDollar ? megaDealImg : specialOfferImg;
  const bonusAmount = parseBonusAmount(offer.bonusLabel);
  const percent = parsePercent(offer.valueLabel);
  const payDisp = isDollar ? `$${offer.payAmount}` : `${offer.payAmount} ⭐`;
  const strikePrice = percent ? (offer.payAmount / (1 - Math.min(parseInt(percent) / 100, 0.95))).toFixed(2) : null;

  // Currency for main "get" box (same as payCurrency)
  const getIcon = isDollar ? "💵" : "⭐";
  // Bonus is always extra stars (your spec: $→$+⭐, ⭐→⭐+⭐)
  const bonusIcon = "⭐";

  const title = (offer.title || (isDollar ? "MEGA DEAL" : "SPECIAL OFFER")).toUpperCase();

  return (
    <div
      className="rounded-[28px] p-1 relative"
      style={{
        background: "linear-gradient(135deg, hsl(45 95% 60%), hsl(35 90% 50%), hsl(45 95% 60%))",
        boxShadow: isDollar
          ? "0 18px 50px hsla(25, 90%, 45%, 0.55)"
          : "0 18px 50px hsla(280, 75%, 45%, 0.55)",
      }}
    >
      <div
        className="rounded-[24px] overflow-hidden relative"
        style={{
          background: isDollar
            ? "linear-gradient(180deg, hsl(265 60% 22%), hsl(275 65% 14%))"
            : "linear-gradient(180deg, hsl(275 60% 25%), hsl(285 65% 16%))",
          border: "2px solid hsl(45 95% 55%)",
        }}
      >
        {/* === Banner header === */}
        <div className="relative pt-3 pb-1 px-4">
          <div
            className="relative rounded-xl py-2 text-center"
            style={{
              background: "linear-gradient(180deg, hsl(280 55% 35%), hsl(275 60% 22%))",
              border: "2px solid hsl(45 95% 60%)",
              boxShadow: "inset 0 -3px 0 hsla(0,0%,0%,0.3), 0 4px 12px hsla(0,0%,0%,0.4)",
            }}
          >
            {/* star on top of banner */}
            <div
              className="absolute left-1/2 -top-3 -translate-x-1/2 text-2xl"
              style={{ filter: "drop-shadow(0 2px 3px hsla(0,0%,0%,0.5))" }}
            >
              ⭐
            </div>
            <h2
              className="font-black text-xl tracking-wide leading-none"
              style={{
                color: "hsl(45 95% 92%)",
                textShadow: "2px 2px 0 hsla(0,0%,0%,0.45), 0 0 12px hsla(45,95%,60%,0.4)",
                fontFamily: '"Arial Black", system-ui, sans-serif',
              }}
            >
              {title}
            </h2>
          </div>
        </div>

        {/* === Hero image (full, uncropped) === */}
        <div className="relative w-full px-2" style={{ aspectRatio: "1 / 1" }}>
          <img
            src={heroImg}
            alt={title}
            className="absolute inset-0 w-full h-full object-contain"
            style={{ filter: "drop-shadow(0 8px 18px hsla(0,0%,0%,0.45))" }}
          />

          {/* Discount starburst badge (top-left) */}
          {percent && (
            <div
              className="absolute top-2 left-2 w-20 h-20 flex items-center justify-center"
              style={{
                background: "radial-gradient(circle, hsl(0 85% 55%) 0%, hsl(0 80% 45%) 60%, hsl(0 75% 40%) 100%)",
                clipPath:
                  "polygon(50% 0%, 60% 12%, 75% 5%, 78% 22%, 95% 22%, 88% 38%, 100% 50%, 88% 62%, 95% 78%, 78% 78%, 75% 95%, 60% 88%, 50% 100%, 40% 88%, 25% 95%, 22% 78%, 5% 78%, 12% 62%, 0% 50%, 12% 38%, 5% 22%, 22% 22%, 25% 5%, 40% 12%)",
                boxShadow: "0 4px 14px hsla(0,80%,40%,0.55)",
                transform: "rotate(-12deg)",
              }}
            >
              <div className="text-center leading-none">
                <div
                  className="font-black text-xl"
                  style={{
                    color: "hsl(45 95% 92%)",
                    textShadow: "1.5px 1.5px 0 hsla(0,0%,0%,0.45)",
                  }}
                >
                  {percent}
                </div>
                <div
                  className="font-black text-[11px] mt-0.5"
                  style={{
                    color: "hsl(45 95% 92%)",
                    textShadow: "1px 1px 0 hsla(0,0%,0%,0.45)",
                  }}
                >
                  OFF!
                </div>
              </div>
            </div>
          )}
        </div>

        {/* === Value ribbon === */}
        {percent && (
          <div className="px-4 -mt-2 mb-2 flex justify-center">
            <div
              className="relative px-8 py-1.5 text-center"
              style={{
                background: "linear-gradient(180deg, hsl(330 85% 60%), hsl(320 80% 50%))",
                clipPath:
                  "polygon(8% 0%, 92% 0%, 100% 50%, 92% 100%, 8% 100%, 0% 50%)",
                boxShadow: "0 4px 10px hsla(330,70%,40%,0.5)",
              }}
            >
              <span
                className="font-black text-sm tracking-wide"
                style={{
                  color: "hsl(45 95% 95%)",
                  textShadow: "1.5px 1.5px 0 hsla(0,0%,0%,0.4)",
                }}
              >
                {percent} VALUE
              </span>
            </div>
          </div>
        )}

        {/* === Amount boxes === */}
        <div className="flex items-center justify-center gap-2 px-3 pb-3">
          <div
            className="flex-1 rounded-2xl py-3 text-center"
            style={{
              background: "linear-gradient(180deg, hsla(0,0%,0%,0.4), hsla(0,0%,0%,0.55))",
              border: "2px solid hsl(45 85% 55%)",
              boxShadow: "inset 0 2px 0 hsla(0,0%,100%,0.1), 0 3px 8px hsla(0,0%,0%,0.3)",
            }}
          >
            <div className="text-3xl leading-none mb-1">{getIcon}</div>
            <div
              className="font-black text-base leading-none"
              style={{ color: "hsl(0 0% 100%)", textShadow: "1px 1px 0 hsla(0,0%,0%,0.5)" }}
            >
              {offer.getAmount.toLocaleString()}
            </div>
          </div>

          {bonusAmount && (
            <>
              <div
                className="text-3xl font-black"
                style={{ color: "hsl(45 95% 70%)", textShadow: "1.5px 1.5px 0 hsla(0,0%,0%,0.4)" }}
              >
                +
              </div>
              <div
                className="flex-1 rounded-2xl py-3 text-center"
                style={{
                  background: "linear-gradient(180deg, hsla(0,0%,0%,0.4), hsla(0,0%,0%,0.55))",
                  border: "2px solid hsl(45 85% 55%)",
                  boxShadow: "inset 0 2px 0 hsla(0,0%,100%,0.1), 0 3px 8px hsla(0,0%,0%,0.3)",
                }}
              >
                <div className="text-3xl leading-none mb-1">{bonusIcon}</div>
                <div
                  className="font-black text-base leading-none"
                  style={{ color: "hsl(45 95% 75%)", textShadow: "1px 1px 0 hsla(0,0%,0%,0.5)" }}
                >
                  {bonusAmount.toLocaleString()}
                </div>
              </div>
            </>
          )}
        </div>

        {/* === Buy button === */}
        <div className="px-4 pb-4">
          <motion.button
            whileTap={{ scale: 0.95 }}
            disabled={busy}
            onClick={onClaim}
            className="w-full rounded-2xl py-3.5 font-black text-lg disabled:opacity-60 relative"
            style={{
              background: "linear-gradient(180deg, hsl(140 80% 50%), hsl(150 75% 38%))",
              color: "hsl(0 0% 100%)",
              textShadow: "1.5px 1.5px 0 hsla(0,0%,0%,0.4)",
              boxShadow:
                "0 6px 0 hsl(140 75% 28%), 0 10px 20px hsla(140,70%,30%,0.5), inset 0 2px 0 hsla(0,0%,100%,0.25)",
              border: "2px solid hsl(140 80% 35%)",
            }}
          >
            <div className="flex items-center justify-center gap-2">
              <span>{busy ? "Processing…" : payDisp}</span>
              {strikePrice && !busy && (
                <span
                  className="text-sm font-bold relative"
                  style={{ color: "hsla(0,0%,100%,0.75)" }}
                >
                  <span style={{ textDecoration: "line-through", textDecorationColor: "hsl(0 85% 55%)", textDecorationThickness: "2px" }}>
                    {isDollar ? `$${strikePrice}` : `${strikePrice} ⭐`}
                  </span>
                </span>
              )}
            </div>
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default OfferCard3D;
