import { useEffect, useState } from 'react'
import { apiInstituition } from '../../services/api'
import './TableComponent.css'

const TableComponent = ({country}) => {
    const [institutionsList, setInstitutionsList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage, setRecordsPerPage] = useState(10);
    const [currentRecords, setCurrentRecords] = useState([]);

    const loadInstitutionsList = async () => {
        try {
            const response = await apiInstituition.get(`https://cors-anywhere.herokuapp.com/universities.hipolabs.com/search?country=${country}`);
            setInstitutionsList(response.data);
        } catch (error) {
            console.error("Erro ao carregar lista:", error);
        }
    };

    const handleInstitutionsList = () => {
        const indexOfLastRecord = currentPage * recordsPerPage;
        const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
        setCurrentRecords(institutionsList.slice(indexOfFirstRecord, indexOfLastRecord));
    };

    useEffect(() => {
        loadInstitutionsList();
    }, [country]);

    useEffect(() => {
        handleInstitutionsList();
    }, [institutionsList, currentPage, recordsPerPage]);

    const handlePageChange = (event) => {
        setCurrentPage(Number(event.target.value));
    };

    const handleRecordsPerPageChange = (event) => {
        setRecordsPerPage(Number(event.target.value));
        setCurrentPage(1);
    };

    const totalPages = Math.ceil(institutionsList.length / recordsPerPage);

    return (
        <div className='select-container'>
            <table className="container-table">
                <thead>
                    <tr>
                        <th className="table-header">Número</th>
                        <th className="table-header">Nome da Instituição</th>
                        <th className="table-header">Site</th>
                        <th className="table-header">Domínio</th>
                        <th className="table-header">Estado</th>
                    </tr>
                </thead>
                <tbody>
                    {currentRecords.map((institution, index) => (
                        <tr key={index} className="table-row">
                            <td className="table-cell">{(currentPage - 1) * recordsPerPage + index + 1}</td>
                            <td className="table-cell">{institution.name}</td>
                            <td className="table-cell">
                                <a href={institution.web_pages[0]} target="_blank" rel="noopener noreferrer">{institution.web_pages[0]}</a>
                            </td>
                            <td className="table-cell">{institution.domains.join(', ')}</td>
                            <td className="table-cell">{institution.alpha_two_code}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="pagination-container">
                <label htmlFor="recordsPerPage">Registros por página: </label>
                <select id="recordsPerPage" value={recordsPerPage} onChange={handleRecordsPerPageChange}>
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                </select>
                <label htmlFor="currentPage">Página: </label>
                <select id="currentPage" value={currentPage} onChange={handlePageChange}>
                    {[...Array(totalPages)].map((_, index) => (
                        <option key={index + 1} value={index + 1}>{index + 1}</option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export { TableComponent }