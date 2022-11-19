import moment from "moment";

export const useFilterDate = () => {
  const currentDate = moment();
  const dateFormat = "D-MM-YY";

  const filterDate = arr => {
    // filter by current day
    const getToday = () =>
      arr.filter(data => {
        const date = moment(data.created_on).format(dateFormat);

        return date === currentDate.format(dateFormat);
      });

    // filter by current week
    const getWeek = () =>
      arr.filter(data => {
        const firstDay = currentDate.startOf("week").dayOfYear();
        const lastDay = currentDate.endOf("week").dayOfYear();
        const date = moment(data.created_on).dayOfYear();

        return date >= firstDay && date <= lastDay;
      });

    // filter by current month
    const getMonth = () =>
      arr.filter(data => {
        const date = moment(data.created_on).month();

        return date === currentDate.month();
      });

    const getAll = () => arr;

    return {
      getAll,
      getToday,
      getWeek,
      getMonth,
    };
  };

  return filterDate;
};
