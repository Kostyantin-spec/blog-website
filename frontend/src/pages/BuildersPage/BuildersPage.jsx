import ServiceCard from '../../Components/ServiceCard/ServiceCard';
import {ukrainianServices} from '../../servicesData'
import './BuildersPage.css'

const BuildersPage = () => {


  return (
    <div className="dark-theme-wrapper">
   <div className="services-container">
      <div className="services-header">
        <h2>Кращі інструменти для вашого бізнесу</h2>
        <p>Ми відібрали надійні українські сервіси, які допоможуть вам зростати</p>
      </div>

      <div className="services-grid">
        {ukrainianServices.map(service => (
          <ServiceCard 
            key={service.id}
            {...service} 
          />
        ))}
      </div>
    </div>
    </div>
  );
};

export default BuildersPage;