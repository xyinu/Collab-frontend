import client from "../../axios";
import react, { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import NavBar from "../../components/navBar";
import ListView from "./components/listView";
import { useIsAuthenticated } from "@azure/msal-react";
import { Button } from "@material-tailwind/react";

function FAQ(){

    const [inputs, setInputs] = useState({category:'Late Submission'});
    const [tasks, setTasks] = useState([]);
    const [formErrors, setFormErrors] = useState({});
    const [categories, setCategories]=useState([])
    const [categoryInput, setCategoryInput]=useState("")
    const [show, setShow]=useState(false)

    const handleShow =(e) =>{
        setShow(prev=>!prev)
    }

    async function getCategories(){
        const request = await client.get('faqcategory/')
        setCategories(request.data)
    }

    const handleCategorySubmit = async() =>{
        await client.post('faqcategory/',{category:categoryInput})
        setShow(prev=>!prev)
        setCategoryInput("")
        await getCategories()
    }

    const handleCategoryChange = (e) => {
        setCategoryInput(e.target.value)
    }

    const validate = (values) => {
        const errors = {};
        if (!values.title) {
          errors.title = "Title is required";
        } 
        if (!values.details) {
            errors.details = "Detail is required!";
        } 
        return errors;
      };

    const handleChange = (event) => {
      const name = event.target.name;
      const value = event.target.value;
      setInputs(values => ({...values, [name]: value}))
    }

    async function getFaq(){
        const request= await client.get('faq/')
        setTasks(request.data)
    }

    const handleSubmit = async (event) =>{
        const errors = validate(inputs)
        if(Object.keys(errors).length === 0){
            await client.post('faq/',{...inputs})
            setInputs({category:'Late Submission'})
            getFaq()
            setFormErrors({})
            return true
        } else{
            setFormErrors(errors);
            return false
        }
    }
    const isAuthenticated = useIsAuthenticated();

    useEffect(()=>{
        if(isAuthenticated){
            getFaq()
            getCategories()
        }
    },[isAuthenticated])

    function Form(){
        return(
            <form className="w-full">
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-title">
                        Question
                    </label>
                    <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-title" type="text" placeholder="" onChange={handleChange} name="title" value={inputs.title || ""}/>
                    <h6 className="text-red-500 text-lg">{formErrors.title}</h6>
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-detail">
                        Answer
                    </label>
                    <textarea className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-detail" placeholder="" onChange={handleChange} name="details" value={inputs.details || ""}/>
                    <h6 className="text-red-500 text-lg">{formErrors.details}</h6>
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-state">
                    Category
                </label>
                <div className="relative">
                    <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state" onChange={handleChange} name="category" value={inputs.category || ""}>
                    {
                        categories.map((data,idx)=>{
                            return <option key={idx}>{data.category}</option>
                        })
                    }
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                    </div>
                </div>
                </div>
                </div>
                <div>
            {show && 
            <div className="flex flex-row">
            <input className="appearance-none block bg-gray-200 text-gray-700 border border-gray-200 rounded mr-2 w-1/2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" placeholder="" onChange={handleCategoryChange} name="categories" value={categoryInput}/>
            <Button size="sm" color="green" onClick={handleCategorySubmit}>
            <p>
                Submit Category
            </p>
            </Button>
            <Button size="sm" color="green" className="ml-2"onClick={handleShow}>
            <p>
                x
            </p>
            </Button>
            </div>
            }
            {
                !show &&
                <Button size="sm" color="green" onClick={handleShow}>
                <p>
                    Add Category
                </p>
                </Button>
            }
            </div>
            </form>
        )
    }



    return(
        <div className="flex flex-col h-screen">
            <NavBar/>
            <ListView items={tasks} header={'FAQs'} getFaq={getFaq} Form={Form} saveFunction={handleSubmit} categories={categories}/>
        </div>
    )
}

export default FAQ;