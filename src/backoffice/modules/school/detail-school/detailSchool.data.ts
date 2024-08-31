import { useEffect } from "react";
import { registerCustomizations } from "@/backoffice/components/global-customization/globalCustomizations";
import { SchoolAPI } from "../api/schoolApi";

interface Props {
  id: string; // Assume this ID is passed as a prop or fetched from a context
}

const useSchoolCustomizations = (id: string) => {
  useEffect(() => {
    console.log(id)
    const loadSchoolData = async () => {
      try {
        const schoolData = await SchoolAPI.getById(id);

        const schoolCustomTitles: { [key: string]: string } = {};
        const schoolCustomBreadcrumbs: { [key: string]: string } = {};

        // Assuming `schoolData` contains the necessary data directly
        schoolCustomTitles[schoolData.id] = schoolData.name;
        schoolCustomBreadcrumbs[schoolData.id] = schoolData.name;

        registerCustomizations('school', schoolCustomTitles, schoolCustomBreadcrumbs);
      } catch (error) {
        console.error('Error loading school data for breadcrumbs', error);
      }
    };

    loadSchoolData();
  }, [id]);
};

export default useSchoolCustomizations;
