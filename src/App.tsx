import React, { useState } from 'react';
import './App.css';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { SampleData } from './data/mock-data';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import moment from 'moment';
import {
  ProjectEmployeeGroupingData,
  ProjectGroupingData,
} from './utils/functions';
import { TemporalTranslations as t } from './utils/constants';

type GroupingType =
  | 'default'
  | 'project'
  | 'project_employee'
  | 'employee_project';

const DefColWidth = 150;

const App = () => {
  const ProjectField: GridColDef = {
    field: 'project',
    headerName: 'Project',
    width: DefColWidth,
    valueGetter: (params) => `${params.value.name}`,
  };

  const EmployeeField: GridColDef = {
    field: 'employee',
    headerName: 'Employee',
    width: DefColWidth,
    valueGetter: (params) => `${params.value.name}`,
  };

  const DateField: GridColDef = {
    field: 'date',
    headerName: 'Date',
    width: DefColWidth,
    valueGetter: (params) =>
      `${moment(params.value.name).format('DD MMM YYYY')}`,
  };

  const HoursField: GridColDef = {
    field: 'hours',
    headerName: 'Hours',
    width: DefColWidth,
  };

  const Groupings: Record<GroupingType, GridColDef[]> = {
    default: [ProjectField, EmployeeField, DateField, HoursField],
    project: [ProjectField, HoursField],
    project_employee: [ProjectField, EmployeeField, HoursField],
    employee_project: [EmployeeField, ProjectField, HoursField],
  };

  const SampleDataProcedure: Record<GroupingType, any> = {
    default: SampleData,
    project: ProjectGroupingData(),
    project_employee: ProjectEmployeeGroupingData(),
    employee_project: ProjectEmployeeGroupingData(),
  };

  const [SelectedGrouping, setSelectedGrouping] =
    useState<GroupingType>('default');

  const FixedSampleData = SampleDataProcedure[SelectedGrouping].map(
    (item, index) => ({
      ...item,
      id: `key-${index + 1}-${item.date}`,
    })
  );

  const onChangeGrouping = (newGrouping) => {
    setSelectedGrouping(newGrouping);
  };

  return (
    <div
      style={{
        display: 'flex',
        width: '100vw',
        height: '100vh',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
    >
      <div
        style={{
          display: 'flex',
          //width: '50vw',
          marginBottom: 20,
        }}
      >
        <FormControl fullWidth>
          <InputLabel id="agg-select-label">{'Sorting'}</InputLabel>
          <Select
            labelId="agg-select-label"
            id="agg-select"
            label="Sorting"
            value={SelectedGrouping}
            onChange={(e) => onChangeGrouping(e.target.value)}
          >
            {Object.keys(Groupings).map((item, index) => {
              return (
                <MenuItem key={`key-${item}-${index}`} value={item}>
                  {t[item]}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </div>
      <div
        style={{
          width: DefColWidth * Groupings[SelectedGrouping].length,
          height: '50vh',
          flex: 'display',
        }}
      >
        <DataGrid
          columns={Groupings[SelectedGrouping]}
          rows={FixedSampleData}
        />
      </div>
    </div>
  );
};

export default App;
