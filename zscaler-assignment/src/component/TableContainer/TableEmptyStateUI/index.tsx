//Custom Component
import EmptyState from "../../EmptyState";

//Styles
import './tableEmptyStateUI.scss';

const EmptyStateUI = () => {
    return (
      <div className="valign-wrapper table-empty-state-ui vcenter">
        <EmptyState
          title='Oopsie! No Data Found in this page...'
          subTitle='Please select any other page'
        />
      </div>
    )
}

export default EmptyStateUI;