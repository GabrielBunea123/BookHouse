import React,{useEffect,useState} from 'react'
import { Typography,Grid,FormControl } from '@material-ui/core'
import {makeStyles} from '@material-ui/core'
import { Link } from 'react-router-dom';
import Rating from '@material-ui/lab/Rating';
import { useHistory } from 'react-router';


const useStyles = makeStyles((theme) => ({
    root1:{
        flexGrow: 1,
        margin:5,
      },
    }));

const SearchedResults = (props) => {

    const classes = useStyles()
    var category = props.history.location.state
    const [lastCategory,setLastCategory] = useState('')

    // if (category){
    //     getResults()
    // }
    const [searched_items,setItems] = useState([])
    const history = useHistory()
    if (category !==lastCategory && category !=='') {
        getResults()
        setLastCategory(category)
    }
    else if(category ===''){
        category = lastCategory
    }
    function getResults(){
        fetch("/api/searched-results"+'?searched='+category)
        .then((res)=>res.json())
        .then((data)=>setItems(data))
    }

    useEffect(() => {
        getResults()
        window.scrollTo(0, 0);
      }, []);

    function renderResults(){
        if(searched_items.length>0 && category !==''){
            return( 
                <Grid className={`home`} container spacing={1} alignContent="center">
                {searched_items.map((item, index) => (
                <div className={classes.root1}>
                <div className="card-container" item xs={12} align="center">
                    <Link className="link" to={`/product-details/${item.id}`}>
                    <div className='card'>
                        <img className="card-img" src={item.image ? item.image :'/static/images/noImage.png'} alt="Avatar"></img>
                        <div className="card-data">
                        <Typography component="h6" variant="h6"> {item.name.slice(0,30)} </Typography> 
                        </div>
                        {item.rating==0?<small>Evalueaza produsul</small>:<Rating name="read-only" value={item.rating} readOnly />}
                        <h2 className="card-price"><b>{item.price} Lei</b></h2>
                    </div>
                    </Link>
                </div>
                </div>
            
                ))}
                </Grid>
                )
            }
            else{
                return(
                <Grid style={{color:"white",paddingTop:'10%',paddingBottom:20}} item xs={12} align="center">
                    <FormControl style={{width:"70%",backgroundColor:"rgb(255, 153, 58)",padding:10,borderRadius:30,marginTop:10}}>
                      <Typography variant="h3" component="h3">Nu s-au gasit produse</Typography>
                    </FormControl>
                  </Grid>
                )
            }
    }

    return (
        <div style={{paddingBottom:150}}>
            <Grid container spacing={1} style={{paddingTop:20}}>
                <Grid style={{marginLeft:50}} item xs={12}>
                    <Typography variant="h3" component="h3">
                        Rezultate pentru: " {category} "
                    </Typography>
                </Grid>
            </Grid>
            {renderResults()}
        </div>
    )
}

export default SearchedResults
