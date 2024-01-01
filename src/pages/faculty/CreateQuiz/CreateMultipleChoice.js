import React from 'react'
import "./CreateMultipleChoice.scss"
import Sidebar from '../../../components/Sidebar/Sidebar'
import PageLayout from '../../../layouts/pageLayout/PageLayout'
import FacultyOnly from '../../../layouts/facultyOnly/FacultyOnly'

const CreateMultipleChoice = () => {
  return (
    <>
        <Sidebar/>
        <PageLayout>
            <FacultyOnly>
                <div className='cmc-container'>
                    <div className='cmc-wrapper'>
                        <div className='cmc-top'>
                            <div className='cmc-input'>
                                <h1>Quiz Title:</h1>
                                <input type='text' placeholder='Enter Quiz Title...' />
                            </div>
                        </div>
                        <div className='cmc-bottom'>
                            <div className='cmc-input'>
                                    <h1>Quiz Instructions:</h1>
                                    <textarea type='text' placeholder='Enter Instructions...' />
                            </div>
                            <div className='cmc-input'>
                                <h1>Quiz Points:</h1>
                                <input type='text' placeholder='Enter Points...' />
                            </div>
                        </div>

                    </div>
                    <div className='cmc-creation'>
                        <button>Create</button>
                        <p>Save as draft</p>
                    </div>
                    
                </div>
                
            </FacultyOnly>
        </PageLayout>
    </>
    
  )
}

export default CreateMultipleChoice