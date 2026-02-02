import VacancyCard from '../components/VacancyCard';
import type { Vacancy } from '../types';

interface Props {
  vacancies: Vacancy[];
}

const VacanciesList = ({ vacancies }: Props) => {
  return (
    <div className="vacancies-list">
      {vacancies.map((v) => (
        <VacancyCard key={v._id} vacancy={v} />
      ))}
    </div>
  );
};

export default VacanciesList;