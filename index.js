document.addEventListener("DOMContentLoaded", function () {
  let currentStep = 1;
  const totalSteps = 3;

  // Fetch country data
  fetch("https://restcountries.com/v3.1/all")
    .then((response) => response.json())
    .then((data) => {
      const countryDropdown = document.getElementById("countryDropdown");
      const countryOptions = document.createElement("div");

      // Add a class to the countryOptions container
      countryOptions.classList.add("countrydropdown-options");
      console.log(data[0]);

      data.sort((a, b) => {
        const nameA = a.name.common.toUpperCase();
        const nameB = b.name.common.toUpperCase();
        return nameA.localeCompare(nameB);
      });
      showSelectedImage(
        data[0].flags.png,
        data[0].idd.root + data[0].idd.suffixes[0]
      );

      data.forEach((country) => {
        const option = document.createElement("div");
        option.value = country.cca2;
        option.classList.add("country-option");

        const label = document.createElement("label");

        const img = document.createElement("img");
        img.src = country.flags.png;
        img.alt = country.name.common;
        img.classList.add("country-flag");
        label.appendChild(img);

        option.appendChild(label);
        const span1 = document.createElement("span");
        span1.classList.add("country-name");
        span1.appendChild(document.createTextNode(country.name.common));
        option.appendChild(span1);
        const span2 = document.createElement("span");
        span2.classList.add("country-code");
        span2.appendChild(
          document.createTextNode(
            `${
              country.idd.root +
              (country.idd.suffixes && country.idd.suffixes[0])
            }`
          )
        );
        option.appendChild(span2);
        option.addEventListener("click", () => {
          showSelectedImage(
            country.flags.png,
            country.idd.root + country.idd.suffixes[0]
          );
          countryOptions.classList.remove("open");
        });

        countryOptions.appendChild(option);
      });
      countryDropdown.appendChild(countryOptions);

      document
        .getElementById("selectedImageContainer")
        .addEventListener("click", () => {
          countryOptions.classList.toggle("open");
        });
    })
    .catch((error) => console.error("Error fetching data:", error));

  document.addEventListener("click", (event) => {
    const countryOptions = document.querySelector(".countrydropdown-options");
    const countryDropdown = document.getElementById("countryDropdown");
    if (
      !countryDropdown.contains(event.target) &&
      countryOptions.classList.contains("open")
    ) {
      countryOptions.classList.remove("open");
    }
  });
  // Function to show the selected country's image
  function showSelectedImage(imageSrc, countrycode) {
    const selectedImageContainer = document.getElementById(
      "selectedImageContainer"
    );

    // Remove previous image if exists
    selectedImageContainer.innerHTML = "";
    const countrycodediv = document.createElement("div");
    countrycodediv.appendChild(document.createTextNode(countrycode));

    countrycodediv.classList.add("country-code");
    selectedImageContainer.appendChild(countrycodediv);
    countrycodediv.id = "step-1-country-code";

    const selectedImage = document.createElement("img");
    selectedImage.src = imageSrc;
    selectedImage.alt = "Selected Country Flag";
    selectedImage.classList.add("country-flag");
    selectedImageContainer.appendChild(selectedImage);
  }

  function showStep(stepNumber) {
    for (let i = 1; i <= totalSteps; i++) {
      const step = document.getElementById(`costformstep-${i}`);
      const step1 = document.getElementById(`costform_1_step${i}`);
      const heading = document.getElementById(`costform_2_${i}`);
      const nextButton = document.getElementById("nextBtn-1");
      const mobilenextButton = document.getElementById("mobile-nextBtn-1");
      const getacall = document.getElementById("costformgetacall");
      const mobilegetacall = document.getElementById("mobile-costformgetacall");
      if (stepNumber == 3) {
        nextButton.style.display = "none";
        getacall.style.display = "flex";
        mobilegetacall.style.display = "flex";
        mobilenextButton.style.display = "none";
      } else {
        nextButton.style.display = "flex";
        getacall.style.display = "none";
        mobilegetacall.style.display = "none";
        mobilenextButton.style.display = "flex";
      }

      if (i === stepNumber) {
        if (step) {
          step.style.display = "block";
        }
        if (step1) {
          step1.style.display = "flex";
        }
        if (heading) {
          heading.style.display = "block";
        }
      } else {
        if (step) {
          step.style.display = "none";
        }
        if (step1) {
          step1.style.display = "none";
        }
        if (heading) {
          heading.style.display = "none";
        }
      }
    }
  }

  function updateStepNavigation() {
    const prevButton = document.getElementById("prevBtn-1");
    const nextButton = document.getElementById("nextBtn-1");
    const mobileprev = document.getElementById("mobile-prevBtn-1");
    const mobilenextButton = document.getElementById("mobile-nextBtn-1");

    if (currentStep === 1) {
      prevButton.style.background = "#F5F5F5";
      prevButton.style.color = "#C1C1C1";
      mobileprev.style.background = "#F5F5F5";
      mobileprev.style.color = "#C1C1C1";
    } else {
      prevButton.style.background = "#F5F5F5";
      prevButton.style.color = "#000";
      mobileprev.style.background = "#F5F5F5";
      mobileprev.style.color = "#000";
    }

    if (currentStep === totalSteps) {
      nextButton.style.color = "#C1C1C1";
      mobilenextButton.style.color = "#C1C1C1";
    } else {
        nextButton.style.color = "#FFF";
        mobilenextButton.style.color = "#FFF";
    }
  }

  showStep(currentStep);
  updateStepNavigation();

  document.getElementById("nextBtn-1").addEventListener("click", function () {
    // if (currentStep == 1) {
    //     if (document.getElementById('coststep1_1').value == "") {
    //         return false;
    //     }
    //     if (document.getElementById('coststep1_2').value == "") {
    //         return false;
    //     }
    //     if (document.getElementById('coststep1_3').value == "") {
    //         return false;
    //     }
    //     if (document.getElementById('coststep1_4').value == "") {
    //         return false;
    //     }

    // } else if (currentStep == 2) {
    //     if (document.getElementById('coststep2_1').value == "") {
    //         return false;
    //     }
    //     if (document.getElementById('coststep2_2').value == "") {
    //         return false;
    //     }
    //     if (document.getElementById('coststep2_3').value == "") {
    //         return false;
    //     }
    // }
    if (currentStep < totalSteps) {
      currentStep++;
      showStep(currentStep);
      updateStepNavigation();
    }
  });

  document.getElementById("prevBtn-1").addEventListener("click", function () {
    if (currentStep > 1) {
      currentStep--;
      showStep(currentStep);
      updateStepNavigation();
    }
  });
  document
    .getElementById("mobile-nextBtn-1")
    .addEventListener("click", function () {
    //   if (currentStep == 1) {
    //     if (document.getElementById("coststep1_1").value == "") {
    //       return false;
    //     }
    //     if (document.getElementById("coststep1_2").value == "") {
    //       return false;
    //     }
    //     if (document.getElementById("coststep1_3").value == "") {
    //       return false;
    //     }
    //     if (document.getElementById("coststep1_4").value == "") {
    //       return false;
    //     }
    //   } else if (currentStep == 2) {
    //     if (document.getElementById("coststep2_1").value == "") {
    //       return false;
    //     }
    //     if (document.getElementById("coststep2_2").value == "") {
    //       return false;
    //     }
    //     if (document.getElementById("coststep2_3").value == "") {
    //       return false;
    //     }
    //   }
      if (currentStep < totalSteps) {
        currentStep++;
        showStep(currentStep);
        updateStepNavigation();
      }
    });

  document
    .getElementById("mobile-prevBtn-1")
    .addEventListener("click", function () {
      if (currentStep > 1) {
        currentStep--;
        showStep(currentStep);
        updateStepNavigation();
      }
    });
  document
    .getElementById("costformgetacall")
    .addEventListener("click", function () {
      if (currentStep < totalSteps) {
        currentStep++;
        showStep(currentStep);
        updateStepNavigation();
      }
    });
  document
    .getElementById("mobile-costformgetacall")
    .addEventListener("click", function () {
      if (currentStep < totalSteps) {
        currentStep++;
        showStep(currentStep);
        updateStepNavigation();
      }
    });


});
function toggleRotation(rotationIconId) {
    var icon = document.getElementById(rotationIconId);

    // Toggle rotation by adding or removing the 'rotate' class
    if (!icon.classList.contains("rotate")) {
      icon.style.transform = "rotate(0deg)";
      icon.classList.add("rotate");
    } else {
      icon.style.transform = "rotate(180deg)";
      icon.classList.remove("rotate");
    }
  }

  function toggleDetails(detailsId, rotationIconId) {
    toggleRotation(rotationIconId);
    var details = document.getElementById(detailsId);
    if (details.style.display === "block") {
      details.style.display = "none";
    } else {
      details.style.display = "block";
    }
  }
  
  // Function to toggle the active/non-active states
  function toggleStates(container) {
    const checkboxActive = container.querySelector('.checkbox-active');
    const checkboxNonActive = container.querySelector('.checkbox-non-active');

    // Toggle the visibility based on the current state
    checkboxActive.style.display = checkboxActive.style.display === 'none' ? 'flex' : 'none';
    checkboxNonActive.style.display = checkboxNonActive.style.display === 'none' ? 'flex' : 'none';
}
function toggleStates1(container1,container2,container3) {
    const checkboxActive1 = container1.querySelector('.checkbox-active');
    const checkboxNonActive1 = container1.querySelector('.checkbox-non-active');
    const checkboxActive2 = container2.querySelector('.checkbox-active');
    const checkboxNonActive2 = container2.querySelector('.checkbox-non-active');
    const checkboxActive3 = container3.querySelector('.checkbox-active');
    const checkboxNonActive3 = container3.querySelector('.checkbox-non-active');

    // Toggle the visibility based on the current state
    checkboxActive1.style.display = 'flex';
    checkboxNonActive1.style.display = 'none';
    checkboxNonActive2.style.display = 'flex';
    checkboxActive2.style.display = 'none';
    checkboxNonActive3.style.display = 'flex';
    checkboxActive3.style.display = 'none';
}

