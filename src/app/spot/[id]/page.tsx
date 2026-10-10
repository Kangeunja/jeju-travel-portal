"use client";

import SpotDetailHeader from "@/components/spot/SpotDetailHeader";
import { use, useEffect, useState } from "react";

export default function SpotDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const spotId = resolvedParams.id;

  const [augmentedData, setAugmentedData] = useState<any>(null);

  useEffect(() => {
    async function fetchAugmentedData() {
      try {
        const res = await fetch(`/api/jeju/${spotId}`);
        const singleSpotData = await res.json();

        const augmentRes = await fetch("/api/augment-spot", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            rawData: singleSpotData,
            categoryName: singleSpotData.contentscd?.label,
          }),
        });

        const result = await augmentRes.json();
        if (result.success) {
          setAugmentedData(result.data);
        }
      } catch (error) {
        console.error("Failed to augment spot data", error);
      }
    }
    if (spotId) {
      fetchAugmentedData();
    }
  }, [spotId]);

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {augmentedData && <SpotDetailHeader data={augmentedData} />}

      {/* <div className="border-t pt-6">
        <h2 className="text-xl font-bold mb-2">{rawData.title}</h2>
        <p className="text-gray-600">{rawData.address}</p>
      </div> */}
    </div>
  );
}
