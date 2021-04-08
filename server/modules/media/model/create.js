import { query } from '../../../database';

const createMedia = async (
  { fileName, key, bucket, bucketRegion, createdBy, path },
  client,
) => {
  const values = [fileName, key, bucket, bucketRegion, createdBy];
  const sql = `
    INSERT INTO media(
      file_name,
      key,
      bucket,
      bucket_region,
      created_by
    )
      VALUES (
        $1,
        $2,
        $3,
        $4,
        $5
      ) RETURNING id
  `;
  const res = await query(sql, values, client);
  return res.rows[0];
};

export { createMedia };
