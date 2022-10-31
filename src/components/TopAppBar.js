import TopAppBar, {
  TopAppBarFixedAdjust, 
  TopAppBarIcon,
  TopAppBarRow,
  TopAppBarSection,
  TopAppBarTitle,
} from "@material/react-top-app-bar";
import MaterialIcon from "@material/react-material-icon";
import AccountMenu from "./AccountMenu";

const MyTopAppBar = () => {
    return (
      <div>
        <TopAppBar>
          <TopAppBarRow>
            <TopAppBarSection align='start'>
              <TopAppBarIcon navIcon tabIndex={0}>
                <MaterialIcon hasRipple role="button" icon='local_pizza' onClick={() => {window.location = '/';}} />
              </TopAppBarIcon>
              <TopAppBarTitle>Food Ordering App</TopAppBarTitle>
            </TopAppBarSection>
            <TopAppBarSection align='end' role='toolbar'>
              <TopAppBarIcon actionItem tabIndex={0}>
                <AccountMenu />
              </TopAppBarIcon>
            </TopAppBarSection>
          </TopAppBarRow>
        </TopAppBar>
        <TopAppBarFixedAdjust></TopAppBarFixedAdjust>
      </div>
    );
  }
  
  export default MyTopAppBar;