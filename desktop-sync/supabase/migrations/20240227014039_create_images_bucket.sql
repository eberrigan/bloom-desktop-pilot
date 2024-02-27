INSERT INTO storage.buckets (id, name)
  VALUES ('images', 'images')
    ON CONFLICT DO NOTHING;

DROP POLICY IF EXISTS "Authenticated users can select images" ON storage.objects;
CREATE POLICY "Authenticated users can select images" ON storage.objects
FOR SELECT TO authenticated
USING ( bucket_id = 'images' );

DROP POLICY IF EXISTS "Authenticated users can update images" ON storage.objects;
CREATE POLICY "Authenticated users can update images" ON storage.objects
FOR UPDATE TO authenticated
USING ( bucket_id = 'images' );

DROP POLICY IF EXISTS "Authenticated users can delete images" ON storage.objects;
CREATE POLICY "Authenticated users can delete images" ON storage.objects
FOR DELETE TO authenticated
USING ( bucket_id = 'images' );

DROP POLICY IF EXISTS "Authenticated users can insert images" ON storage.objects;
CREATE POLICY "Authenticated users can insert images" ON storage.objects
FOR INSERT TO authenticated
WITH CHECK ( bucket_id = 'images' );
