
import MainLayout from "../../layout/MainLayout";
import TriggerLeadForm from "../../components/Add-Form-Component/TriggerLeadesForm";


const AddTriggerLeads = () => {
  return (
    <MainLayout>
      <div className="text-white ">
        <h1 className="text-2xl text-black font-semibold mb-6">Add Trigger Leads</h1>
        <TriggerLeadForm />
       
      </div>
    </MainLayout>
  );
};

export default AddTriggerLeads;
