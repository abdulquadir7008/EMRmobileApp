import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
    // backgroundColor: 'white',
    fontFamily:'SpaceMono',
    
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 0,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginTop: 0,
    paddingBottom: 2
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingTop: 5,   fontFamily:'SpaceMonobold',
  },
  logoContainer: {
    alignItems: 'flex-end',
    justifyContent: 'center'
  },
  logo: {
    width: 70,
    height: 30,
    marginTop: 0
  },
  formContainer: {
    width: '100%',
    paddingLeft: 10,
    paddingRight:10,
    marginTop:10
  },
  userInfo:{
    flexDirection:'row',
    width:'100%',
    justifyContent:'space-between',
    backgroundColor:'#0172fe',
    elevation:2,
    padding:5, 
    marginTop:0,
  },
  profilePic:{
    flexDirection:'row',
    alignItems:'flex-start',
  },
  notification:{
    alignItems:'flex-end',
    flexDirection:'row',
    height:32, marginRight:0
  },
  profilePhoto:{
    width:40,
    height:40,
    borderRadius:100,
    borderWidth:2, borderColor:'#fff'
  },
  helloSay:{
    fontSize:12,
    color:'#fff',
    marginLeft:10,
    lineHeight:12,
    fontFamily: 'SpaceMono', 
    marginTop:3,
  },
  fullName:{
    fontSize:14,
    color:'#fff',
    marginLeft:10,
    lineHeight:17,
    fontFamily: 'SpaceMonobold',
  },
  icon: {
    marginLeft: 10, // Adjust this value for spacing between the icons
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
    margin: 5,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: '#000', fontFamily:'SpaceMono',
  },
  clearIcon: {
    marginLeft: 8,
  },
  touchContainer: {
    // flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
    marginTop:5
  },
  categoryButton: {
    padding: 7,
    borderRadius: 30,
    borderWidth:2,
    marginLeft:10,
    paddingLeft:13,
    paddingRight:13
  },
  buttonText: {
    color: 'black',
    fontSize: 13,
    fontFamily:'SpaceMonobold',
  },
  popularCatgory:{
    fontSize:14,
    fontFamily:'SpaceMonobold',
    textAlign:'left',
    marginBottom:10,
    marginLeft:10
  },
  productCard: {
    width: '47.5%', // Each card takes 50% of the row
    padding: 0,
    flexDirection:'column',
    marginRight:9,
  },
  productContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 5,
    position: 'relative', // To position the wishlist icon correctly
    shadowRadius: 8,
    marginBottom:10
    
  },
  productImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 10,
  },
  productName: {
    fontSize: 16,
    fontFamily:'SpaceMonobold',
  },
  productPrice: {
    fontSize: 14,
    color: '#000',
    fontFamily:'SpaceMono',
    marginTop:4
  },
  slogan: {
    fontSize: 14,
    color: '#000',
    fontFamily:'SpaceMono',
    marginTop:0
  },
  
  wishlistIcon: {
    position: 'absolute', // Position the icon absolutely
    top: 10,
    right: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Optional: background for the icon
    borderRadius: 50,
    padding: 5,
  },
  categgoryButton:{
    flexDirection:'row', 
    justifyContent: 'space-around',
    marginBottom:10,
    marginTop:15
  },
  catButton:{
    flexDirection:'row'
  },
  catText:{
    color:'#6b6b6b',fontFamily:'SpaceMonobold', marginTop:4
  },
  dropdownContainer: {
    position: 'absolute',
    top: 50,
    left: 10,
    right: 10,
    backgroundColor: '#fff',
    zIndex: 1,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    maxHeight: 200,
  },
  dropdownItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  
  
});

export default styles;
