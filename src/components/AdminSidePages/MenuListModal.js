
import { React, useEffect, useState } from "react";

export default function MenuListModal({}) {

    /*
  const [selectedIdsLocal, setSelectedIdsLocal] = useState(selectedIds);

  useEffect(()=>{
    setSelectedIdsLocal(selectedIds)
  },[selectedIds])

  useEffect(() => {
    console.log('Local : ',selectedIds);
  }, [selectedIdsLocal]);


  const handleClick = (event) => {
    const foodsId = Number(event.target.dataset.id);
    //if(selectedIds.hasOwnProperty(foodsId )){
    const newSelectedIds = {
      ...selectedIdsLocal,
      [foodsId]: !selectedIds[foodsId],
    };
    setSelectedIdsLocal(newSelectedIds);

  };
*/

  return <>
  <div class="modal" tabindex="-1">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Modal title</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <p>Modal body text goes here.</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>
  </>;
}
