module.exports = async (seq, tableName, existingRecords) => {
  await seq.query(
    `ALTER SEQUENCE "${tableName}_id_seq" RESTART WITH ${existingRecords + 1}`
  );
  return;
};
