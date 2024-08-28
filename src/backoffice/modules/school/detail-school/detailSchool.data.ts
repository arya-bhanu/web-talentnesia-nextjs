import { useEffect } from "react";
import { registerCustomizations } from "@/backoffice/components/global-customization/globalCustomizations";
import { SchoolAPI } from "../api/schoolApi";

interface Props {
  id: string; // Assume this ID is passed as a prop or fetched from a context
}

const useSchoolCustomizations = (id: string) => {
  useEffect(() => {
    const loadSchoolData = async () => {
      try {
        const schoolData = await SchoolAPI.getById(id);
        console.log('School id:', schoolData.id);
        console.log('School name:', schoolData.name);

        const programCustomTitles: { [key: string]: string } = {};
        const programCustomBreadcrumbs: { [key: string]: string } = {};

        // Assuming `schoolData` contains the necessary data directly
        programCustomTitles[schoolData.id] = schoolData.name;
        programCustomBreadcrumbs[schoolData.id] = schoolData.name;

        registerCustomizations('school', programCustomTitles, programCustomBreadcrumbs);
      } catch (error) {
        console.error('Error loading school data for breadcrumbs', error);
      }
    };

    loadSchoolData();
  }, [id]);
};

export default useSchoolCustomizations;
