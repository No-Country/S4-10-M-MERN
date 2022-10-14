import React from "react";

// components
import RemoteRow from "../RemoteRow";

export default function RemoteGrid({ guesses }) {
  return (
    <div>
      {guesses.map((g, i) => {
        return <RemoteRow guess={g} />;
      })}
    </div>
  );
}
