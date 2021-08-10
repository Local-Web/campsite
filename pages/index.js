import { useState } from "react";
import Link from "next/link";

export default function Home() {
  const [agreed, setAgreed] = useState();

  return (
    <div>
      <h1>Campsite</h1>
      <p>
        Before proceeding, please read and agree to the{" "}
        <a href="https://firstdonoharm.dev/version/2/1/license/">
          Hippocratic License (version 2.1)
        </a>
        .
      </p>
      <form>
        <p>
          <label>
            <input
              type="checkbox"
              name="agree"
              onClick={() => setAgreed(!agreed)}
            />{" "}
            I agree to the terms of the Hippocratic License (version 2.1).
          </label>
        </p>
        {agreed ? (
          <Link href="/chat">
            <a>Enter</a>
          </Link>
        ) : (
          ""
        )}
      </form>
    </div>
  );
}
