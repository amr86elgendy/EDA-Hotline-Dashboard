

export function paginate (product) {
  const itemPerPage = 5;
  const numberOfPages =  Math.ceil(product.length / itemPerPage);
  const newProblems = Array.from({ length: numberOfPages }, (_, index) => {
    const start = index * itemPerPage; //=> 0, 5, 10, ....
    return product.slice(start, start + itemPerPage)
  })
  return newProblems;
}