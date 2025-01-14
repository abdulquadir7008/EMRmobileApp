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
    marginTop: 20,
    paddingBottom: 5
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
    marginTop: 10
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
    padding:5, borderRadius:10,
  },
  profilePic:{
    flexDirection:'row',
    alignItems:'flex-start',
    
 
  },
  notification:{
    alignItems:'flex-end',
    flexDirection:'row',
    height:32, marginRight:10
  },
  profilePhoto:{
    width:40,
    height:40,
    borderRadius:100,
    borderWidth:2, borderColor:'#fff'
  },
  helloSay:{
    fontSize:14,
    color:'#fff',
    marginLeft:10,
    lineHeight:17,
    fontFamily: 'SpaceMono', marginTop:3,
  },
  fullName:{
    fontSize:14,
    color:'#fff',
    marginLeft:10,
    lineHeight:17,
    fontFamily: 'SpaceMonobold',
  },
  icon: {
    marginLeft: 15, // Adjust this value for spacing between the icons
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginTop: 5,
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
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
    marginTop:15
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
    fontSize:18,
    fontFamily:'SpaceMonobold',
    textAlign:'left',
    marginBottom:10
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
  
  
});

export default styles;
