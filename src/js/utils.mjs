export async function fetchProducts() {  
    const response = await fetch("https://fakestoreapi.com/products"); // Replace with your actual API URL  

    if (!response.ok) {  
        throw new Error("Failed to fetch products. Please try again later.");  
    }  

    const data = await response.json();  
    return data.products; // Assuming your API returns an object with a 'products' array.  
}  