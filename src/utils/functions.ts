import { SampleData } from '../data/mock-data';
import { cloneDeep } from 'lodash';

export const ProjectGroupingData = () => {
  var FixedData = [];
  const data = cloneDeep(SampleData);

  data.forEach((item) => {
    const FindItemIndex = FixedData.findIndex(
      (reg) => item.project?.id === reg.project?.id
    );

    if (FindItemIndex !== -1) {
      FixedData[FindItemIndex].hours += item.hours;
    } else {
      FixedData.push(item);
    }
  });

  return FixedData;
};

export const ProjectEmployeeGroupingData = () => {
  var FixedData = [];
  const data = cloneDeep(SampleData);

  data.forEach((item) => {
    const FindItemIndex = FixedData.findIndex(
      (reg) =>
        item.project?.id === reg.project?.id &&
        item.employee?.id === reg.employee?.id
    );

    if (FindItemIndex !== -1) {
      FixedData[FindItemIndex].hours += item.hours;
    } else {
      FixedData.push(item);
    }
  });

  return FixedData;
};
