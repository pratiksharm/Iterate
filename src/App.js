import { useState, useContext } from "react";
import { Box, Button, Heading, Grommet, ResponsiveContext, Text, Nav, Anchor, grommet} from "grommet";
import { Close, Iteration,  Moon, Sun, List, Facebook, Instagram, Linkedin, Medium, Twitter } from "grommet-icons";
import AppHeader from "./components/AppHeader";
import AppSidebar from "./components/AppSidebar";
import theme from "./theme";
import Dashboard from "./components/Dashboard/Dashboard";
import LandingPage from "./components/LandingPage/LandingPage";
import {
  BrowserRouter,
  Switch,
  Route,
  Link
} from 'react-router-dom';
import MarkdownEditor from "./components/Editor/Editor";

//contexts
import {AuthProvider} from './contexts/AuthContext/AuthContext';
import { GlobalProvider, GlobalContext} from './contexts/GlobalContext/globalcontext';

import {ApolloProvider} from '@apollo/client';
import {client} from './contexts/ApolloClient';

const About = () => (
  <Box responsive>
    <Heading>
      TODO:  About Page
    </Heading>
  </Box>
)
  

const Contact = () => (
  <Box>
    <Heading>
      TODO:  This is the Contact Page
    </Heading>
  </Box>
)
const PrivacyPage = () => (
  <Box>
    <Heading>
      TODO: PrivacyPage
    </Heading>
  </Box>
)
const NoMatch = () => (
  <Box >
    <Box>
      <Heading> 404: Seems you are lost</Heading>  
      <Box direction="row" justify="between" gap="small">
      <Anchor href="/" label="home"/> 
      <Anchor href="/dashboard" label="Dashboard"/> 
      </Box>
      
      <Text> Click on the link above to get to home</Text>
    </Box>
  </Box>
)

function App() {
  const [showSidebar, setShowSidebar] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const {isLoggedIn} = useContext(GlobalContext)
  return (
    <Grommet theme={theme} themeMode={darkMode? "dark": "light"} full>
      <BrowserRouter>
  <ApolloProvider client={client}>
  <AuthProvider>
    <GlobalProvider>
      <ResponsiveContext.Consumer>
        {(size) => (
          <Box fill >
            <AppHeader >
              <Heading brand level="3" gap="small" margin={{left: "large"}}>
                <Iteration size="medium" color="black"/>
                <Text size="medium" color="black" margin={{left: "xsmall"}}>
                  Iterate
                </Text>
              </Heading>
              <Box direction="row" margin={{left: "large"}}>
                <Button 
                  icon={!darkMode? <Sun/>: <Moon/>}
                  onClick={() => setDarkMode(!darkMode)}
                />
                <Button
                  icon={!showSidebar? <List />: <Close/>}
                  onClick={() => setShowSidebar(!showSidebar)}
                />
              </Box>
            </AppHeader>
            <Box direction="row" flex overflow={{ horizontal: "hidden" }}>
              <Box flex align="center" justify="center" margin={{bottom: "medium"}} 
              >
              <Switch>
                <Route exact path="/" component={LandingPage}/>
                <Route path="/about" component={About}/>              
                <Route path="/contact" component={Contact}/>                
                <Route path="/privacy" component={PrivacyPage}/>
                <Route path="/dashboard" component={Dashboard}/>
                <Route path="/mobile" component={MarkdownEditor }/>
                <Route path="/editor/:id" component={MarkdownEditor }/>
                <Route path="*" component={NoMatch} />
            </Switch>
              </Box>
              <AppSidebar
                size={size}
                showSidebar={showSidebar}
                onClose={() => setShowSidebar(false)}
              >
              
                <Nav direction="column">
                {isLoggedIn? 
                <Link to ="/">
                  <Text>Home</Text>
                </Link>
                 : <Link to="/dashboard">
                 <Text>Dashboard</Text>
                 </Link> 

                }
                <Link to='/about'>
                <Text>About</Text>
                </Link>
                <Link to="/contact">
                  <Text>Contact</Text>
                </Link>
                <Link to="/mobile">
                  <Text>mobile</Text>
                </Link>
                <Link to="/privacy">
                  <Text>Privacy Policy</Text>
                </Link>
                  <Text color="black-4">Follow Us on</Text>
                  <Box direction="row">
                    <Anchor icon={<Facebook/>} href="/" />
                    <Anchor icon={<Instagram/>} href="/"/>
                    <Anchor icon={<Linkedin/>} href="/" />
                  </Box>
                  <Box direction="row" justify="center">
                    <Anchor icon={<Medium/>} href="/" />
                    <Anchor icon={<Twitter/>} href="/" />
                  </Box>
                </Nav>                 
              </AppSidebar>
            </Box>
          </Box>
        )}
      </ResponsiveContext.Consumer> 
      </GlobalProvider>
    </AuthProvider>
  </ApolloProvider>   
      </BrowserRouter>

    </Grommet>
  );
}

export default App;
