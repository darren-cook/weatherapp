import { initial } from "./modules/initial";
import { handleSearch } from "./modules/weatherSearch";
console.log("testt")

initial();

const inputSearch = document.getElementById("input-search");

inputSearch.addEventListener("click", function(){
    handleSearch();
});