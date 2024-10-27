import React, { useEffect } from "react";

export default function Yourpic3() { 
  const array = ["App", "Web", "Flutter", "App", "Web", "React", "Web"];
  const sort = ["App", "Web"];

  // Count occurrences of "App" and "Web"
  const counts = sort.reduce((acc, item) => {
    acc[item] = array.filter(i => i === item).length;
    return acc;
  }, {});

  // Use useEffect to log the counts when the component mounts
  useEffect(() => {
    console.log(`"App" is present ${counts["App"]} times in the array.`);
    console.log(`"Web" is present ${counts["Web"]} times in the array.`);
  }, [counts]);

  // Render "App" and "Web" based on their counts
  const renderApp = Array.from({ length: counts["App"] }).map((_, index) => (
    <h1 key={`app-${index}`}>App</h1>
  ));

  const renderWeb = Array.from({ length: counts["Web"] }).map((_, index) => (
    <h1 key={`web-${index}`}>Web</h1>
  ));

  return (
    <div style={{ marginTop: "300px" }}>
      <h1>Experiment</h1>
      {renderApp}
      {renderWeb}
    </div>
  );
}
