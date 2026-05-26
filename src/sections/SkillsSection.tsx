import { useState } from 'react';
// Custom Components
import AnimatedHeader from '../components/AnimatedHeader';
// shadcn components
import { Button } from '../components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Tabs, TabsContent, TabsContents, TabsList, TabsTrigger } from '@/components/ui/shadcn-io/tabs';
// Icons
import { 
  AiOutlineAppstore, 
  AiOutlineCode, 
  AiOutlineApi, 
  AiOutlineBgColors, 
  AiOutlineTool, 
  AiOutlineRocket,
  AiOutlineCloudServer
} from "react-icons/ai";
import { languages, frameworks_libraries, styling_ui, backend, tools, planningToLearn } from '@/data/skills';
import { playSound } from '@/utils/playSound';
import ClickSound from '@/assets/sound/click.oga?url';

const priorityOrder = ['React.Js', 'TypeScript', 'JavaScript', 'Tailwind CSS', "Next.Js", 'Bootstrap', 'PHP', 'MySQL'];

const allSkills = [...languages, ...frameworks_libraries, ...styling_ui, ...backend, ...tools]
    // remove duplicated skills items
    .filter(
        (item, index, arr) =>
            index === arr.findIndex((other) => other.label === item.label)
    )
    .sort((a, b) => {
        const idx1 = priorityOrder.indexOf(a.label);
        const idx2 = priorityOrder.indexOf(b.label);

        // Skills in priorityOrder come first, in the same order
        if (idx1 !== -1 && idx2 === -1) return -1;
        if (idx1 === -1 && idx2 !== -1) return 1;

        // If both are in priorityOrder, sort by their index in it
        if (idx1 !== -1 && idx2 !== -1) return idx1 - idx2;

        //otherwise keep their original order
        return 0;
    });

export default function Skills() {
    const [currentChoice, setCurrentChoice] = useState<string>('all');
    const [popoverOpen, setPopoverOpen] = useState<boolean>(false);
    
    const listItemIconSize = 20;
    const categories = [
	    { 
	        label: "All", 
	        fn: () => setCurrentChoice('all'),
	        icon: <AiOutlineAppstore size={listItemIconSize}/>,
	        value: 'all',
	        data: allSkills,
	    },
	    { 
	        label: "Languages", 
	        fn: () => setCurrentChoice('languages'),
	        icon: <AiOutlineCode size={listItemIconSize}/>,
	        value: 'languages',
	        data: languages,
	    },
	    { 
	        label: "Frameworks & Libraries", 
	        fn: () => setCurrentChoice('frameworks-libraries'),
	        icon: <AiOutlineApi size={listItemIconSize}/>,
	        value: 'frameworks-libraries',
	        data: frameworks_libraries,
	    },
	    { 
	        label: "Styling/UI", 
	        fn: () => setCurrentChoice('styling-ui'),
	        icon: <AiOutlineBgColors size={listItemIconSize}/>,
	        value: 'styling-ui',
	        data: styling_ui,
	    },
	    { 
	        label: "Backend", 
	        fn: () => setCurrentChoice('backend'),
	        icon: <AiOutlineCloudServer size={listItemIconSize}/>,
	        value: 'backend',
	        data: backend,
	    },
	    { 
	        label: "Tools", 
	        fn: () => setCurrentChoice('tools'),
	        icon: <AiOutlineTool size={listItemIconSize}/>,
	        value: 'tools',
	        data: tools,
	    },
	    { 
	        label: "What's Next", 
	        fn: () => setCurrentChoice('next'),
	        icon: <AiOutlineRocket size={listItemIconSize}/>,
	        value: 'next',
	        data: planningToLearn,
	    },
    ];

    const skillsMap = Object.fromEntries(categories.map(c => [c.value, c.data]));
    const chosenSkillsCategory = skillsMap[currentChoice] ?? [];

    const renderSkillsCards = () => {
        return chosenSkillsCategory.map((skill, index) => (
            <div key={index}
                style={{ '--skill-color': skill.color } as React.CSSProperties}
                className='flex-center flex-col gap-3 ease-in-out duration-400 text-foreground rounded-lg p-5 transition shadow
                    bg-(--skill-color)/50
                    hover:scale-110 hover:brightness-110 hover:saturate-150
                    border-4 border-(--skill-color)/40 aspect-square max-sm:min-h-[150px] hover:border-(--skill-color)'>
                <img src={skill.img} className='h-22 w-22 object-contain sm:h-30 sm:w-30' />
                <code className='text-center'>{skill.label}</code>
            </div>
        ))
    }

    return <section id="skills" className='section-padding flex-section-center'>
        <AnimatedHeader text='Skills & Tools' />
        {/* skills navigation on small screens */}
        <nav className='block md:hidden'>
            <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
                <PopoverTrigger>
                    <Button variant='outline'>
                    	{categories.find(cat => cat.value === currentChoice)?.icon}
                        {categories.find(cat => cat.value === currentChoice)?.label}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className='flex flex-col gap-3 py-3 pl-3'>
                    {categories.map((item, key) => {
                        return <div
                            className='flex items-center gap-2'
                            key={key}
                            onClick={() => {
                                item.fn()
								setPopoverOpen(false);
                                playSound(ClickSound)
								document.body.focus();
                            }}
                        >
                            {item.icon} {item.label}
                        </div>
                    })}
                </PopoverContent>
            </Popover>
        </nav>

        {/* Skills section on mobile */}
        <div className='grid grid-cols-2 max-[290px]:grid-cols-1 sm:grid-cols-3 md:hidden gap-3 mx-3 mt-5'>
            {renderSkillsCards()}
        </div>

        {/* Skills section on desktop */}
		<Tabs
			className="hidden md:flex"
			value={currentChoice}
			onValueChange={(value) => {
				setCurrentChoice(value);
				playSound(ClickSound);
	        }
		}>
			<TabsList className="w-full">
                {categories.map((cat, index) => {
					return (
						<TabsTrigger
							key={index}
							value={cat.value}
						>
							{cat.label}
						</TabsTrigger>
					)
				})}
			</TabsList>
            <TabsContents className="mx-1 mb-1 -mt-2 rounded-sm h-full">
                <TabsContent value={currentChoice} className="grid grid-cols-4 lg:grid-cols-5 p-5 mt-4 gap-5">
                    {renderSkillsCards()}
                </TabsContent>
            </TabsContents>
        </Tabs>

    </section>
}
