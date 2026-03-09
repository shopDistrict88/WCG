import { createBrowserRouter } from 'react-router-dom'
import Layout from '../components/Layout'
import HomePage from '../pages/HomePage'
import AboutPage from '../pages/AboutPage'
import ProjectsPage from '../pages/ProjectsPage'
import InsightsPage from '../pages/InsightsPage'
import ApplyPage from '../pages/ApplyPage'
import CareersPage from '../pages/CareersPage'
import ContactPage from '../pages/ContactPage'

import AuthProviderLayout from '../os/AuthProviderLayout'
import OSLogin from '../os/OSLogin'
import OSEntry from '../os/OSEntry'
import Dashboard from '../os/pages/Dashboard'
import Brands from '../os/pages/Brands'
import BrandDetail from '../os/pages/BrandDetail'
import Projects from '../os/pages/Projects'
import Tasks from '../os/pages/Tasks'
import Creative from '../os/pages/Creative'
import Campaigns from '../os/pages/Campaigns'
import Photoshoots from '../os/pages/Photoshoots'
import Vault from '../os/pages/Vault'
import Team from '../os/pages/Team'
import Moderation from '../os/pages/Moderation'
import Ideas from '../os/pages/Ideas'
import Wiki from '../os/pages/Wiki'
import Messages from '../os/pages/Messages'
import Analytics from '../os/pages/Analytics'
import IntelligenceCenter from '../os/pages/IntelligenceCenter'
import AdminPanel from '../os/pages/AdminPanel'
import WorkspaceList from '../os/workspaces/WorkspaceList'
import WorkspaceDetail from '../os/workspaces/WorkspaceDetail'
import Workflows from '../os/pages/Workflows'
import CompanyMap from '../os/pages/CompanyMap'
import CampaignWarRoom from '../os/pages/CampaignWarRoom'
import DropCenter from '../os/pages/DropCenter'
import Timeline from '../os/pages/Timeline'
import CreativeBattles from '../os/pages/CreativeBattles'
import BrandEvolution from '../os/pages/BrandEvolution'
import IdeaMarket from '../os/pages/IdeaMarket'
import UniverseMap from '../os/pages/UniverseMap'
import EmployeeSkillTree from '../os/pages/EmployeeSkillTree'
import BrandExpansion from '../os/pages/BrandExpansion'

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/about', element: <AboutPage /> },
      { path: '/projects', element: <ProjectsPage /> },
      { path: '/insights', element: <InsightsPage /> },
      { path: '/apply', element: <ApplyPage /> },
      { path: '/careers', element: <CareersPage /> },
      { path: '/contact', element: <ContactPage /> },
    ],
  },
  {
    element: <AuthProviderLayout />,
    children: [
      {
        path: '/os/login',
        element: <OSLogin />,
      },
      {
        path: '/os',
        element: <OSEntry />,
        children: [
          { index: true, element: <Dashboard /> },
          { path: 'brands', element: <Brands /> },
          { path: 'brands/:brandId', element: <BrandDetail /> },
          { path: 'expansion', element: <BrandExpansion /> },
          { path: 'projects', element: <Projects /> },
          { path: 'tasks', element: <Tasks /> },
          { path: 'creative', element: <Creative /> },
          { path: 'campaigns', element: <Campaigns /> },
          { path: 'photoshoots', element: <Photoshoots /> },
          { path: 'vault', element: <Vault /> },
          { path: 'team', element: <Team /> },
          { path: 'team/:userId', element: <EmployeeSkillTree /> },
          { path: 'universe', element: <UniverseMap /> },
          { path: 'moderation', element: <Moderation /> },
          { path: 'ideas', element: <Ideas /> },
          { path: 'wiki', element: <Wiki /> },
          { path: 'messages', element: <Messages /> },
          { path: 'workspaces', element: <WorkspaceList /> },
          { path: 'workspaces/:workspaceId', element: <WorkspaceDetail /> },
          { path: 'workflows', element: <Workflows /> },
          { path: 'map', element: <CompanyMap /> },
          { path: 'campaigns/:campaignId', element: <CampaignWarRoom /> },
          { path: 'drops', element: <DropCenter /> },
          { path: 'timeline', element: <Timeline /> },
          { path: 'battles', element: <CreativeBattles /> },
          { path: 'evolution', element: <BrandEvolution /> },
          { path: 'market', element: <IdeaMarket /> },
          { path: 'analytics', element: <Analytics /> },
          { path: 'intelligence', element: <IntelligenceCenter /> },
          { path: 'admin', element: <AdminPanel /> },
        ],
      },
    ],
  },
])
