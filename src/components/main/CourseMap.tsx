"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    kakao: any;
  }
}

export default function CourseMap({ places }: any) {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initMap = () => {
      if (!window.kakao?.maps) return;

      window.kakao.maps.load(() => {
        if (!mapRef.current) return;

        // const firstPlace = places[0];
        const firstLat = Number(places[0].lat);
        const firstLng = Number(places[0].lng);

        const mapOption = {
          center: new window.kakao.maps.LatLng(firstLat, firstLng),
          level: 8,
        };
        const map = new window.kakao.maps.Map(mapRef.current, mapOption);
        const bounds = new window.kakao.maps.LatLngBounds();
        const linePath: any[] = [];

        places.forEach((place: any, index: number) => {
          const point = new window.kakao.maps.LatLng(place.lat, place.lng);
          linePath.push(point);
          bounds.extend(point);

          new window.kakao.maps.Marker({
            position: point,
            map: map,
          });

          const overlayContent = `
          <div style="padding: 3px 8px; 
            background: #2563eb; 
            color: white; 
            border-radius: 12px; 
            font-size: 11px; 
            font-weight: bold; 
            white-space: nowrap; 
            box-shadow: 0 2px 5px rgba(0,0,0,0.3);">
            ${index + 1}. ${place.name}
          </div>
        `;

          new window.kakao.maps.CustomOverlay({
            position: point,
            content: overlayContent,
            yAnchor: 2.3,
            map: map,
          });
        });

        const polyline = new window.kakao.maps.Polyline({
          path: linePath,
          strokeWeight: 4,
          strokeColor: "#2563eb",
          strokeOpacity: 0.8,
          strokeStyle: "solid",
        });

        polyline.setMap(map);
        map.setBounds(bounds);
      });
    };

    if (window.kakao?.maps) {
      initMap();
    } else {
      const timer = setInterval(() => {
        if (window.kakao?.maps) {
          initMap();
          clearInterval(timer);
        }
      }, 100);

      return () => clearInterval(timer);
    }
  }, [places]);

  return (
    <div
      ref={mapRef}
      className="w-full h-[450px] min-h-[300px] rounded-xl border border-gray-200 overflow-hidden"
    />
  );
}
