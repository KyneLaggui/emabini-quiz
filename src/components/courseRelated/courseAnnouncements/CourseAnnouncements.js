import "./CourseAnnouncements.scss"

export const CourseAnnouncements = () => {
    const announcements = [
        {
            announcementTitle : 'CPU Scheduling Examination',
            announcementDate : 'November 16, 2023',
            announcementContent: '',
        },
        {
            announcementTitle : 'Midterm Examination',
            announcementDate : 'November 23, 2023',
            announcementContent: '',
        },
        
    
    ]
  return (
    <div className='ca-container'>
        <h1>Announcements</h1>
        
        {announcements.length === 0 ? (
            <p>No Announcements</p>
            ) : (
                
                announcements.map((announce, i) => {
                    return (
                        <div className='each-announcements-container' key={i}>
                            <h3>{announce.announcementTitle}</h3>
                            <p>{announce.announcementDate}</p>
                        </div>
                    )
                })
            )
        
        }
        <div className="ca-modal">
            <p>See all Announcements</p>
        </div>

        

    </div>
  )
}
