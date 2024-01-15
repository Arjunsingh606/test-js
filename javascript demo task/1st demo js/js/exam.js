// ...

const editPlayerDetails = async (id: string) => {
    playerIndex = id;
  
    // Reset form fields and remove validation messages
    resetFormFields();
    removeValidation();
  
    // Show the modal
    (document.querySelector(".modal-backdrop.show") as HTMLDivElement).style.opacity = "0.4";
    (document.querySelector(".modal-content") as HTMLDivElement).style.display = "block";
  
    // Hide the submit button and show the update button
    submitBtn.style.display = "none";
    addPlayerLable.style.display = "none";
    updateBtn.style.display = "block";
    editPlayerLable.style.display = "block";
  
    try {
      // Fetch player details using the provided id
      const response = await fetch(`http://localhost:3000/players/${playerIndex}`);
      const playerDetails = await response.json();
  
      // Populate form fields with player details
      fullName.value = playerDetails.fullName;
      mobNumber.value = playerDetails.mobNumber;
      email.value = playerDetails.email;
      sportName.value = playerDetails.sportName;
      experties.value = playerDetails.experties;
  
      // Handle update button click
      updateBtn.addEventListener("click", async (e) => {
        e.preventDefault();
  
       
        if (sportFormValidation("default")) {
          playerDetails.fullName = fullName.value;
          playerDetails.mobNumber = mobNumber.value;
          playerDetails.email = email.value;
          playerDetails.sportName = sportName.value;
          playerDetails.experties = experties.value;
  
          try {
            // Send a PUT request to update player details
            const updateResponse = await fetch(`http://localhost:3000/players/${playerIndex}`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(playerDetails),
            });
  
            
            if (updateResponse.ok) {     
              displaySportList();
   
              (document.querySelector(".modal-backdrop.show") as HTMLDivElement).style.opacity = "0";
              (document.querySelector(".modal-content") as HTMLDivElement).style.display = "none";
            } else {
              console.error("Failed to update player details");
            }
          } catch (error) {
            console.error(error, "Server issue");
          }
        }
      });
    } catch (error) {
      console.error(error, "Failed to fetch player details");
    }
  };
  
  // ...
  