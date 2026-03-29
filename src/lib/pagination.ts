import logger from "./logger";

export default function paginate(
  Model: any,
  page: number = 1,
  size: number = 10,
  conditions: any,
): any {
  return new Promise(async (resolve, reject) => {
    try {
      const pageToUse = Number(page) - 1;
      const pageSizeToUse = Number(size);
      const recordsToSkip: number = pageToUse * pageSizeToUse;
      const data: any[] =
        (await Model.findMany({
          skip: recordsToSkip,
          take: pageSizeToUse,
          ...conditions,
          orderBy: {
            updatedAt: "desc",
          },
        })) || [];
      const numberOfRecords = data.length
        ? await Model.count({ where: conditions.where })
        : 0;
      const totalPages =
        numberOfRecords > 0 ? Math.ceil(numberOfRecords / pageSizeToUse) : 1;
      resolve({
        total: numberOfRecords,
        count: data.length,
        data,
        totalPages,
        currentPage: pageToUse + 1,
      });
    } catch (error) {
      logger.error(error);
      reject(error);
    }
  });
}
