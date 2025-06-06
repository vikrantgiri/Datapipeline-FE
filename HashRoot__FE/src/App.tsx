import {Routes,Route} from  'react-router-dom';

import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import Credentials from '../src/pages/credentials/Credentials';
import AddCredentials from '../src/pages/credentials/AddCredentials';
import FileDownloadDefinition from './pages/FileDownloadDefinition/FileDD';
import AddFileDD from './pages/FileDownloadDefinition/AddFileDD';
import Files from './pages/Files/files'
import InputFileDefinition from './pages/Input-File-Definitions/InputFileDefinitions';
import PrepMails from './pages/prep-mails/prepMails';
import TaskStatus from './pages/Task-status/taskStatus';
import TriggerLeads from './pages/Trigger-leads/TriggerLeads';
import AddFiles from './pages/Files/AddFiles'
import AddPrepMails from './pages/prep-mails/AddPrepMails';
import AddTriggerLeads from './pages/Trigger-leads/AddTriggerLeads';
import AddInputFileDefinition from './pages/Input-File-Definitions/AddInputFileDefinition';
import ChangeFileDD from './pages/FileDownloadDefinition/ChangeFileDD';
import ChangeCredentials from './pages/credentials/changeCredentials';
import ChangeInputFileDefinition from './pages/Input-File-Definitions/ChangeInputFileDefinition';
import ChangePrepMails from './pages/prep-mails/ChangePrepMails'
import ChangeTriggerLeads from './pages/Trigger-leads/ChangeTriggerLeads';

const App = () => {
  return (
    <>
  <Routes>
    <Route path ='/' element={<Home/>}/>
    <Route path ='/dashboard' element={<Dashboard/>}/>
    <Route path ='/credentials' element={<Credentials/>}/>
    <Route path="/credentials/add" element={<AddCredentials />} />
    <Route path ='/FileDownloadDefinition' element={<FileDownloadDefinition/>}/>
    <Route path ='/FileDownloadDefinition/add' element={<AddFileDD/>}/>
   <Route path ='/Files' element={<Files/>}/>
   <Route path ='/Files/add' element={<AddFiles/>}/>
     <Route path ='/InputFileDefinitions' element={<InputFileDefinition/>}/>
     <Route path='/InputFileDefinition/add' element={<AddInputFileDefinition/>}/>
    <Route path='/PrepMails' element={<PrepMails/>}/>
    <Route path='/PrepMails/add' element={<AddPrepMails/>}/>
    <Route path='/TaskStatus' element={<TaskStatus/>}/>
    <Route path='/TriggerLeads' element={<TriggerLeads/>}/>
    <Route path='/TriggerLeads/add' element={<AddTriggerLeads/>}/>
     <Route path="/credentials/change" element={<ChangeCredentials/>} />
   <Route path="/FileDownloadDefinition/change" element={<ChangeFileDD />} />
   <Route path='/InputFileDefinition/change' element={<ChangeInputFileDefinition/>}/>
     <Route path='/PrepMails/change' element={<ChangePrepMails/>}/>
       <Route path='/TriggerLeads/change' element={<ChangeTriggerLeads/>}/>

    </Routes>  
    </>
  )
}

export default App