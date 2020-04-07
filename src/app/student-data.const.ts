import { StudentResultModel } from './student-result.model';

export const STUDENT_DATA: StudentResultModel[] = [
  { name: 'John', class: 'Grade 6', marks: '300', grade: 'B' },
  { name: 'Charles', class: 'Grade 6', marks: '300', grade: 'B' },
  { name: 'Eunice', class: 'Grade 6', marks: '420', grade: 'A' },
  { name: 'Kate', class: 'Grade 6', marks: '410', grade: 'A-' },
  { name: 'Joe', class: 'Grade 6', marks: '310', grade: 'B-' },
  { name: 'Peter', class: 'Grade 6', marks: '200', grade: 'C' },
  { name: 'Henry', class: 'Grade 6', marks: '250', grade: 'C+' },
  { name: 'Paul', class: 'Grade 6', marks: '450', grade: 'A' },
  { name: 'Pius', class: 'Grade 6', marks: '400', grade: 'A-' },
  { name: 'Kenendy', class: 'Grade 6', marks: '150', grade: 'D' }
];

export function createData(size: number = 1000): StudentResultModel[] {
  const result: StudentResultModel[] = [];
  for (let i = 0; i < size; i++) {
    const num = Math.floor(Math.random() * 10);
    result.push({ id: i + 1, ...STUDENT_DATA[num] });
  }
  return result;
}
