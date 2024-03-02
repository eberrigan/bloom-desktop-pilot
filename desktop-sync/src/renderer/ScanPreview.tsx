import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "../types/database.types";
import { useEffect, useState } from "react";
import { ScansWithPhenotypers } from "../types/electric.types";

export function ScanPreview({
  scan,
  supabase,
  thumb,
}: {
  scan: ScansWithPhenotypers;
  supabase: SupabaseClient<Database>;
  thumb: boolean;
}) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    if (scan.electric_cyl_images.length > 0) {
      const image = scan.electric_cyl_images[0];
      if (supabase) {
        getImageUrl({
          supabase,
          objectPath: image.supabase_object_path,
          thumb: thumb,
        }).then((url) => {
          setImageUrl(url);
        });
      }
    }
  }, [scan, supabase, thumb]);

  return (
    <div>
      {imageUrl === null ? (
        <LoadingImage />
      ) : (
        <img src={imageUrl} className={thumb ? "h-20" : "w-[600px]"} />
      )}
    </div>
  );
}

function LoadingImage() {
  return (
    <div className="animate-pulse h-20 w-20 bg-stone-200 rounded-md"></div>
  );
}

async function getImageUrl({
  supabase,
  objectPath,
  thumb,
}: {
  supabase: SupabaseClient<Database>;
  objectPath: string;
  thumb: boolean;
}) {
  const { data, error } = await supabase.storage.from("images").createSignedUrl(
    objectPath,
    120,
    thumb
      ? {
          transform: {
            width: 200,
            quality: 100,
          },
        }
      : {}
  );

  const signedUrl = data?.signedUrl ?? "";
  return signedUrl;
}
