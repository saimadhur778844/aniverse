import crypto from "crypto";

export default function verifyCashfreeWebhook(
  rawBody,
  signature,
  timestamp
) {
  const secret =
    process.env.CASHFREE_CLIENT_SECRET;

  if (!secret) {
    throw new Error(
      "CASHFREE_CLIENT_SECRET is missing."
    );
  }

  const generated =
    crypto
      .createHmac(
        "sha256",
        secret
      )
      .update(
        timestamp + rawBody
      )
      .digest("base64");

  return generated === signature;
}